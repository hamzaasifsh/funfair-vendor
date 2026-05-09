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

const productImagesUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

router.post("/", authMiddleware, productImagesUpload, createProduct);

router.put("/:id", authMiddleware, productImagesUpload, updateProduct);

router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
