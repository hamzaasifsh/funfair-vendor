const express = require("express");
const router = express.Router();

const {
  createOrder,
  createCheckoutSession,
  confirmCheckoutSession,
  getOrders,
  updateOrderStatus,
  getVendorOrders,
} = require("../controllers/orderController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", createOrder);
router.post("/create-checkout-session", createCheckoutSession);
router.get("/checkout-success", confirmCheckoutSession);
router.get("/", getOrders);
router.get("/vendor-orders", authMiddleware, getVendorOrders);
router.put("/:id", updateOrderStatus);

module.exports = router;
