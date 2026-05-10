const adminMiddleware = (req, res, next) => {
  if (!req.vendor || req.vendor.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }

  next();
};

module.exports = adminMiddleware;
