const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");

// ✅ create app FIRST
const app = express();

// ✅ middleware
app.use(cors());
app.use(express.json());

// ✅ routes (AFTER app is created)
const productRoutes = require("./src/routes/productRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const vendorRoutes = require("./src/routes/vendorRoutes");

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/vendors", vendorRoutes);

// ✅ test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ connect DB
connectDB();

// ✅ start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
