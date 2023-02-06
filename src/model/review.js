// const mongoose = require("mongoose");
import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    reviewTitle: { type: String, required: true },
    reviewDescription: { type: String, required: true },
    rating: Number,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", ReviewSchema);
