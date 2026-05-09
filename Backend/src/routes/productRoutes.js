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
const upload = require("../utils/upload");

router.get("/", getProducts);
router.get("/my-products", authMiddleware, getMyProducts);

router.post("/", authMiddleware, upload.single("image"), createProduct);

router.put("/:id", authMiddleware, upload.single("image"), updateProduct);

router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;