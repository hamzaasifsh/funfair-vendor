const Order = require("../models/Order");
const Product = require("../models/Product");
const Stripe = require("stripe");

const getStripeClient = () => {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  return Stripe(process.env.STRIPE_SECRET_KEY);
};

const createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const newOrder = await Order.create({
      items,
      totalAmount,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

const createCheckoutSession = async (req, res) => {
  try {
    const stripe = getStripeClient();

    if (!stripe) {
      return res
        .status(500)
        .json({ message: "Stripe secret key is not configured" });
    }

    const { items, customerEmail } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart items are required" });
    }

    const productIds = items.map((item) => item.productId).filter(Boolean);
    const products = await Product.find({ _id: { $in: productIds } });

    const orderItems = items.map((item) => {
      const product = products.find(
        (currentProduct) =>
          String(currentProduct._id) === String(item.productId)
      );

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      return {
        productId: product._id,
        vendorId: product.vendorId,
        name: product.name,
        price: Number(product.price || 0),
        quantity: Number(item.quantity || 1),
      };
    });

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0
    );

    const order = await Order.create({
      items: orderItems,
      totalAmount,
      customerEmail: customerEmail || "",
      paymentStatus: "pending",
      paymentProvider: "stripe",
    });

    const appUrl =
      process.env.CLIENT_URL ||
      process.env.FRONTEND_URL ||
      "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail || undefined,
      line_items: orderItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.max(50, Math.round(Number(item.price || 0) * 100)),
        },
        quantity: item.quantity,
      })),
      metadata: {
        orderId: String(order._id),
      },
      success_url: `${appUrl}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cart?payment=cancelled`,
    });

    order.stripeSessionId = session.id;
    await order.save();

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to start Stripe checkout" });
  }
};

const confirmCheckoutSession = async (req, res) => {
  try {
    const stripe = getStripeClient();

    if (!stripe) {
      return res
        .status(500)
        .json({ message: "Stripe secret key is not configured" });
    }

    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ message: "Stripe session id is required" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);
    const order = await Order.findOne({ stripeSessionId: session.id });

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found for this payment" });
    }

    if (session.payment_status === "paid") {
      order.paymentStatus = "paid";
      order.status = "Confirmed";
      order.stripePaymentIntentId = String(session.payment_intent || "");
      order.paidAt = order.paidAt || new Date();
      await order.save();
    }

    res.json({
      order,
      paymentStatus: session.payment_status,
    });
  } catch (error) {
    console.error("Confirm checkout error:", error);
    res.status(500).json({ message: "Failed to confirm Stripe checkout" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

const getVendorOrders = async (req, res) => {
  try {
    const vendorId = String(req.vendor._id);

    const orders = await Order.find({
      "items.vendorId": vendorId,
    }).sort({ createdAt: -1 });

    const filteredOrders = orders.map((order) => {
      const vendorItems = order.items.filter(
        (item) => String(item.vendorId) === vendorId
      );

      const vendorTotalAmount = vendorItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
      );

      return {
        ...order.toObject(),
        items: vendorItems,
        vendorTotalAmount,
      };
    });

    res.json(filteredOrders);
  } catch (error) {
    console.error("Vendor orders error:", error);
    res.status(500).json({ message: "Failed to fetch vendor orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

module.exports = {
  createOrder,
  createCheckoutSession,
  confirmCheckoutSession,
  getOrders,
  getVendorOrders,
  updateOrderStatus,
};
