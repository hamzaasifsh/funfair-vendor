const Vendor = require("../models/vendor");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getAdminStats = async (req, res) => {
  try {
    const [totalVendors, totalProducts, totalOrders, orders] = await Promise.all([
      Vendor.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.find().select("totalAmount items status createdAt"),
    ]);

    const totalRevenue = orders.reduce(
      (sum, order) => sum + Number(order.totalAmount || 0),
      0
    );
    const totalItemsSold = orders.reduce((sum, order) => {
      return (
        sum +
        order.items.reduce(
          (itemSum, item) => itemSum + Number(item.quantity || 0),
          0
        )
      );
    }, 0);

    res.json({
      totalVendors,
      totalProducts,
      totalOrders,
      totalRevenue,
      totalItemsSold,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ message: "Failed to load admin stats" });
  }
};

const getAdminVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find()
      .select("-password")
      .sort({ createdAt: -1 });
    res.json(vendors);
  } catch (error) {
    console.error("Admin vendors error:", error);
    res.status(500).json({ message: "Failed to load vendors" });
  }
};

const getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("vendorId", "name email stallName")
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Admin products error:", error);
    res.status(500).json({ message: "Failed to load products" });
  }
};

const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Admin orders error:", error);
    res.status(500).json({ message: "Failed to load orders" });
  }
};

const deleteAdminVendor = async (req, res) => {
  try {
    if (String(req.vendor._id) === String(req.params.id)) {
      return res.status(400).json({ message: "You cannot delete your own admin account" });
    }

    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    await Product.deleteMany({ vendorId: vendor._id });
    await Order.deleteMany({ "items.vendorId": vendor._id });
    await vendor.deleteOne();

    res.json({ message: "Vendor and related listings deleted" });
  } catch (error) {
    console.error("Admin delete vendor error:", error);
    res.status(500).json({ message: "Failed to delete vendor" });
  }
};

const deleteAdminProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Admin delete product error:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

const updateAdminOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Admin update order error:", error);
    res.status(500).json({ message: "Failed to update order" });
  }
};

module.exports = {
  getAdminStats,
  getAdminVendors,
  getAdminProducts,
  getAdminOrders,
  deleteAdminVendor,
  deleteAdminProduct,
  updateAdminOrderStatus,
};
