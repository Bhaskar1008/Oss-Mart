import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../config/env";
import { BadRequest } from "../utils/error";

const isAuthenticated = (req, res, next) => {
  try {
    // const authorization = req.headers.authorization;
    const authorization = req.headers?.cookie?.split("=")[1];
    const jwtAccessSecret = JWT_ACCESS_SECRET ? JWT_ACCESS_SECRET : "";
    jwt.verify(authorization, jwtAccessSecret);
  } catch (error) {
    next(BadRequest("User is not authenticated", error, 401));
  }
  return next();
};
export { isAuthenticated };
