// const mongoose = require("mongoose");
import mongoose from "mongoose";
const ThumbnailSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ItemConfiguration",
      required: true,
    },
    imageName: { type: String, required: true },
    // imageLink: { type: String, required: true },
    image:  { type:Buffer, required: true },
    contentType: { type: String, required: true },
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

export const Thumbnail = mongoose.model("Thumbnail", ThumbnailSchema);
