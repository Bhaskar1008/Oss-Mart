// const mongoose = require("mongoose");
import mongoose from "mongoose";
const CustomerSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
      required: [true, "Email required"],
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: Number,
  },
  { timestamps: true }
);

export const Customer = mongoose.model("Customer", CustomerSchema);

// module.exports = Customer;
