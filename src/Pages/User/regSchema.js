import { boolean, object, ref, string } from "yup";

const registerValidation = object({
  name: string().required("Please enter your name"),
  email: string()
    .required("Please enter a email")
    .email("Please enter a valid email"),
  password: string()
    .required("Please enter a password")
    .min(8, "Password must be at least 8 characters long"),
  confirm_password: string()
    .required("Please re-type your password")
    .oneOf([ref("password"), null], "Passwords must match"),
  userType: string().required("please select a user type"),
  terms: boolean().oneOf([true], "Please select Terms and Conditions"),
});

const regInitialValue = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  userType: "",
  terms: false,
};

export { registerValidation, regInitialValue };
