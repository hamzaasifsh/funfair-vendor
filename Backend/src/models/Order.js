const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        vendorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Vendor",
        },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: Number,
    customerEmail: { type: String, default: "" },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentProvider: {
      type: String,
      enum: ["manual", "stripe"],
      default: "manual",
    },
    stripeSessionId: { type: String, default: "" },
    stripePaymentIntentId: { type: String, default: "" },
    paidAt: { type: Date },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
