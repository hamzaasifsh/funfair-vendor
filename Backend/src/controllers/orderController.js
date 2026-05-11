const Order = require("../models/Order");

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
  getOrders,
  getVendorOrders,
  updateOrderStatus,
};
