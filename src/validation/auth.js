import * as yup from "yup";

const validateSignup = yup.object({
  fullName: yup
    .string()
    .min(5, "Full name must be minimum 5 characters long")
    .required("Your full name is required"),
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email address is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be minimum 6 characters long"),
});

const validateSignin = yup.object({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email address is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be minimum 6 characters long"),
});

export { validateSignup, validateSignin };
