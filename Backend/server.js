const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");

// ✅ create app FIRST
const app = express();

const parseOrigins = (...values) =>
  values
    .filter(Boolean)
    .flatMap((value) => value.split(","))
    .map((value) => value.trim().replace(/\/$/, ""))
    .filter(Boolean);

const allowedOrigins = new Set(
  parseOrigins(
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    process.env.FRONTEND_URL,
    process.env.CLIENT_URL,
    process.env.CORS_ORIGINS
  )
);

// ✅ middleware
app.use(
  cors({
    origin(origin, callback) {
      const normalizedOrigin = origin?.replace(/\/$/, "");

      if (!normalizedOrigin || allowedOrigins.has(normalizedOrigin)) {
        callback(null, true);
        return;
      }

      console.warn(`Blocked CORS request from origin: ${origin}`);
      callback(null, false);
    },
    credentials: true,
  })
);
app.use(express.json());

// ✅ routes (AFTER app is created)
const productRoutes = require("./src/routes/productRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const vendorRoutes = require("./src/routes/vendorRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/admin", adminRoutes);

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
