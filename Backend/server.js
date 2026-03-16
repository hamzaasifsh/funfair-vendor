const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const productRoutes = require("./src/routes/productRoutes");
const vendorRoutes = require("./src/routes/vendorRoutes");

const app = express();

// ✅ Proper CORS Configuration
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true
}));

// ✅ Parse JSON
app.use(express.json());

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Routes
app.use("/api/products", productRoutes);
app.use("/api/vendors", vendorRoutes);

// ✅ Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});