const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const {
  getAdminStats,
  getAdminVendors,
  getAdminProducts,
  getAdminOrders,
  deleteAdminVendor,
  deleteAdminProduct,
  updateAdminOrderStatus,
} = require("../controllers/adminController");

router.use(authMiddleware, adminMiddleware);

router.get("/stats", getAdminStats);
router.get("/vendors", getAdminVendors);
router.get("/products", getAdminProducts);
router.get("/orders", getAdminOrders);
router.delete("/vendors/:id", deleteAdminVendor);
router.delete("/products/:id", deleteAdminProduct);
router.put("/orders/:id/status", updateAdminOrderStatus);

module.exports = router;
