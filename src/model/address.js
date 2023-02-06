// const mongoose = require("mongoose");
import mongoose from "mongoose";
const AddressSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    name: {
      type: String,
    },
    address: String,
    state: String,
    city: String,
    zipCode: String,
    contactNumber: Number,
    default: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Address = mongoose.model("Address", AddressSchema);
