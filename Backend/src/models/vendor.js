const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    stallName: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);
