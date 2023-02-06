// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const authRouter = require("./src/routes/auth.route");

import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.route";
import { dbConnection } from "./src/config/db";
import categoryRouter from "./src/routes/category.route";
import { isAuthenticated } from "./src/middleware/auth.middleware";
import productRouter from "./src/routes/product.route";
import errorMiddleware from "./src/middleware/error.middleware";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));

/**
 * Swagger related code
 */
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Amazon clone",
      description:
        "This document will contains the apis which amazon clone is serving",
      contact: {
        name: "Aravind ",
      },
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["swagger.yml"],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.static("uploads"));

dbConnection();

app.use("/auth", authRouter);
app.use("/category", isAuthenticated, categoryRouter);
app.use("/product", isAuthenticated, productRouter);
app.use(errorMiddleware);

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});
