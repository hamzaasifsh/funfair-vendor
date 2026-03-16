const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Vendor = require("../models/vendor");

const makeToken = (vendorId) => {
  return jwt.sign({ id: vendorId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// POST /api/vendors/register
exports.registerVendor = async (req, res) => {
  try {
    const { name, email, password, stallName, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email, password are required" });
    }

    const existing = await Vendor.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const vendor = await Vendor.create({
      name,
      email,
      password: hashed,
      stallName: stallName || "",
      phone: phone || "",
    });

    return res.status(201).json({
      _id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      stallName: vendor.stallName,
      token: makeToken(vendor._id),
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/vendors/login
exports.loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password required" });
    }

    const vendor = await Vendor.findOne({ email });
    if (!vendor) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, vendor.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    return res.json({
      _id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      stallName: vendor.stallName,
      token: makeToken(vendor._id),
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};