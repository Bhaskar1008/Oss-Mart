import mongoose from "mongoose";
import { DB_URL } from "./env";
export const dbConnection = () => {
  try {
    mongoose.connect(DB_URL);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
      console.log("Connected successfully");
    });
  } catch (error) {
    console.log("Failed to connect db", error);
  }
};
