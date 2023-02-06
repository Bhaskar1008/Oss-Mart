import { Customer } from "../model/customer";

export const findCustomerByEmail = async (email) => {
  let customer = null;
  try {
    customer = await Customer.findOne({
      email: email,
    });
  } catch {
    customer = null;
  }

  return customer;
};
