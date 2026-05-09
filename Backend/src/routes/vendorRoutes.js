const express = require("express");
const router = express.Router();

const {
  registerVendor,
  loginVendor,
  getAccount,
  deleteAccount,
} = require("../controllers/vendorAuthController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", registerVendor);
router.post("/login", loginVendor);
router.get("/me", authMiddleware, getAccount);
router.delete("/me", authMiddleware, deleteAccount);

module.exports = router;
