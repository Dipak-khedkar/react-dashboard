import { AuthData } from "../pages/AuthPage";
import validator from "validator";

export interface Errors {
  email?: string;
  password?: string;
}

export const validateAuth = (data: AuthData) => {
  const { email, password } = data;
  const errors: any = {};

  if (!validator.isEmail(email)) {
    errors.email = "Please enter a valid email!";
  }

  if (validator.isEmpty(email)) {
    errors.email = "Email is required!";
  }

  if (!validator.isLength(password)) {
    errors.password = "Password should have atleast 8 chars";
  }

  if (validator.isEmpty(password)) {
    errors.password = "Password is required!";
  }
  return errors;
};
