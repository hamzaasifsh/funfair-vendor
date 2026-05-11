const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  updateOrderStatus,
  getVendorOrders,
} = require("../controllers/orderController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/vendor-orders", authMiddleware, getVendorOrders);
router.put("/:id", updateOrderStatus);

module.exports = router;
