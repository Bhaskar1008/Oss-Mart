import jwt from "jsonwebtoken";
import { Customer } from "../model/customer";
import { JWT_ACCESS_SECRET } from "../config/env";

export const registerService = (req) => {
  return Customer.create(req);
};

export const generateAccessToken = (tokenReq) => {
  return jwt.sign(tokenReq, JWT_ACCESS_SECRET, {
    expiresIn: "30d",
  });
};
