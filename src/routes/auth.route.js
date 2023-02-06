// const { Router } = require("express");
// const { registerCustomer } = require("../controllers/auth.controller");

import { Router } from "express";
import {
  login,
  registerCustomer,
  logout,
} from "../controllers/auth.controller";
const authRouter = Router();

authRouter.post("/register", registerCustomer);
authRouter.post("/login", login);
authRouter.get("/logout", logout);

// module.exports = authRouter;
export default authRouter;
