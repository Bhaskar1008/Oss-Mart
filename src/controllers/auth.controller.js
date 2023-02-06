// const { registerService } = require("../services/auth.service");
import { generateAccessToken, registerService } from "../services/auth.service";
import { findCustomerByEmail } from "../services/customer.service";
import { BadRequest } from "../utils/error";

export const registerCustomer = async (req, res, next) => {
  try {
    const customer = await registerService(req.body);
    res.status(200).json({
      data: {
        customer,
      },
      message: "Customer registered successfully",
    });
  } catch (error) {
    next(BadRequest("Failed register the user", error));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let customer = await findCustomerByEmail(email);
    if (customer?.password == password) {
      const accessToken = await generateAccessToken({ id: customer?._id });
      customer.password = null;
      // res.status(200).json({
      //   data: {
      //     customer,
      //     accessToken: accessToken,
      //   },
      //   message: "Login successfully",
      // });
      res.cookie("access_token", accessToken).status(200).json({
        data: {
          customer,
        },
        message: "Login successfully",
      });
    } else {
      next(BadRequest("Email or password is incorrect"));
    }
  } catch (error) {
    next(BadRequest("Failed to login user", error));
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Logout successfully" });
  } catch (error) {
    next(BadRequest("Failed to logout user", error));
  }
};
