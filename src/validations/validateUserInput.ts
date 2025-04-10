import { UserData } from "../pages/CreateUser";
import validator from "validator";

export interface Errors {
  name?: string;
  email?: string;
  phone?: string;
}

export const validateUserInput = (data: UserData) => {
  const { name, email, phone } = data;
  const errors: any = {};

  if (!validator.isLength(name, { min: 3 })) {
    errors.name = "Name should have atleast 3 chars";
  }

  if (validator.isEmpty(name)) {
    errors.name = "Name field is required!";
  }

  if (!validator.isEmail(email)) {
    errors.email = "Please enter a valid email!";
  }

  if (validator.isEmpty(email)) {
    errors.email = "Email field is required!";
  }

  if (validator.isEmpty(phone)) {
    errors.phone = "Phone field is required!";
  }

  return errors;
};
