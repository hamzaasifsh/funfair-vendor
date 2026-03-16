const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  getMyProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productsController");

const authMiddleware = require("../middlewares/authMiddleware");

router.get("/my-products", authMiddleware, getMyProducts);
router.get("/", getProducts);
router.post("/", authMiddleware, createProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;