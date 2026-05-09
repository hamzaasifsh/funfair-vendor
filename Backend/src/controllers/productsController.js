const Product = require("../models/Product");

const getUploadedImages = (req) => {
  const files = [
    ...(req.files?.image || []),
    ...(req.files?.images || []),
  ];

  return files.map((file) => `/uploads/${file.filename}`);
};

const parseExistingImages = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [value].filter(Boolean);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("getProducts error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, image } = req.body;
    const uploadedImages = getUploadedImages(req);
    const images =
      uploadedImages.length > 0 ? uploadedImages : [image].filter(Boolean);

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      vendorId: req.vendor._id,
      images,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("createProduct error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.vendor._id });
    res.json(products);
  } catch (error) {
    console.error("getMyProducts error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      vendorId: req.vendor._id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("deleteProduct error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, image, existingImages } = req.body;
    const uploadedImages = getUploadedImages(req);
    const keptImages = parseExistingImages(existingImages || image);

    const product = await Product.findOne({
      _id: req.params.id,
      vendorId: req.vendor._id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;
    product.category = category;
    product.images =
      uploadedImages.length > 0 || keptImages.length > 0
        ? [...keptImages, ...uploadedImages]
        : product.images;

    const updatedProduct = await product.save();

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("updateProduct error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
