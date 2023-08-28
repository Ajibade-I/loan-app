const yup = require("yup");
const { User } = require("../models/users");

async function validate_signup(data) {
  const schema = yup.object().shape({
    first_name: yup
      .string()
      .min(2)
      .max(15)
      .required("First name is required")
      .label("First name"),
    last_name: yup
      .string()
      .min(2)
      .max(15)
      .required("Last name is required")
      .label("Last name"),
    email: yup
      .string()
      .email("Provide a valid email")
      .required("Email is required")
      .label("Email"),
    phone: yup
      .string()
      .min(11)
      .max(15)
      .required("Phone number is required")
      .label("Phone number"),
    password: yup
      .string()
      .min(9)
      .max(20)
      .required("Password is required")
      .label("Password"),
  });
  try {
    const validation_data = await schema.validate(data);
    return null;
  } catch (error) {
    console.log(error);
    // return error?.errors[0];
  }
}

async function validate_login(data) {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Provide a valid email")
      .required("Email is required")
      .label("Email"),
    password: yup
      .string()
      .min(9)
      .max(20)
      .required("Password is required")
      .label("Password"),
  });
  try {
    const validation_data = await schema.validate(data);
    return null;
  } catch (error) {
    console.log(error);
    // return error?.error[0];
  }
}

module.exports.validate_signup = validate_signup;
module.exports.validate_login = validate_login;
