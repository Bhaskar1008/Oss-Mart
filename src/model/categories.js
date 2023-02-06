// const mongoose = require("mongoose");
import mongoose from "mongoose";
const CategoriesSchema = new mongoose.Schema(
  {
    categoryName: { type: String, unique: true, required: true },

    categoryDescription: String,

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

export const Categories = mongoose.model("Categories", CategoriesSchema);
