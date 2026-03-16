const jwt = require("jsonwebtoken");
const Vendor = require("../models/vendor");

const authMiddleware = async (req, res, next) => {
  try {
    // 1) Check token exists
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 2) Extract token
    const token = authHeader.split(" ")[1];

    // 3) Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4) Find vendor from DB
    const vendor = await Vendor.findById(decoded.id).select("-password");

    if (!vendor) {
      return res.status(401).json({ message: "Vendor not found" });
    }

    // 5) Attach vendor to request
    req.vendor = vendor;

    next(); // go to controller
  } catch (error) {
    res.status(401).json({ message: "Token failed" });
  }
};

module.exports = authMiddleware;