import { EMAIL_PATTERN } from "./Regex";

export const validateEmail = (values) => {
  let errors = {};
  if (!values) {
    errors.email = "Email không được để trống.";
  } else if (!EMAIL_PATTERN.test(values)) {
    errors.email = "Email bạn nhập không hợp lệ!";
  }
  return errors;
};
