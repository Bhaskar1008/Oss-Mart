// const mongoose = require("mongoose");
import mongoose from "mongoose";
const ItemConfigurationSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },

    modelName: { type: String, required: true },

    color: { type: String, required: true },
    formFactor: String,
    specialFeature: String,
    connectivityTechnology: String,
    itemDimensions: String,
    itemWeight: { type: String, required: true },
    finalPrice: { type: Number, required: true },
    mrpPrice: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    netQuantity: { type: Number, required: true },
    soldStock: Number,
    thumbnail: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thumbnail",
      },
    ],
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

export const ItemConfiguration = mongoose.model(
  "ItemConfiguration",
  ItemConfigurationSchema
);
