// const mongoose = require("mongoose");
import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ItemConfiguration",
      required: true,
    },
    colors: { type: Array, required: true },
    rating: { type: Number },
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

export const Product = mongoose.model("Product", ProductSchema);
