import { SignupData } from "../pages/SignupPage";
import validator from "validator";

export interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const signupValidator = (data: SignupData) => {
  const { name, email, password, confirmPassword } = data;
  const errors: any = {};

  //name //
  if (validator.isEmpty(name)) {
    errors.name = "Name is required!";
  }

  //email//

  if (!validator.isEmail(email)) {
    errors.email = "Please enter a valid email!";
  }

  if (validator.isEmpty(email)) {
    errors.email = "Email is required!";
  }

  //password//

  if (validator.isEmpty(password)) {
    errors.password = "Password is required!";
  }

  if (!validator.isLength(password, { min: 8 })) {
    errors.password = "Password should have atleast 8 chars";
  }

  // confirmPassword//

  if (validator.isEmpty(confirmPassword)) {
    errors.confirmPassword = "Confirm Password is required!";
  }

  if (!validator.isLength(confirmPassword, { min: 8 })) {
    errors.confirmPassword = "Password should have atleast 8 chars";
  }

  //match

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match!";
  }

  return errors;
};
