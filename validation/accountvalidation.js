const yup = require("yup");
const { Account } = require("../models/accounts");

async function validate_account() {
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(2)
      .required("Account name is required")
      .label("Account name"),
    accountBalance: yup
      .number()
      .min(100_000)
      .required("Account balance is required")
      .label("Account balance"),
    minLoan: yup
      .number()
      .min(0)
      .required("Minimum loan is required")
      .label("Minimum loan"),
    maxLoan: yup
      .number()
      .min(0)
      .required("Maximum loan is required")
      .label("Maximum loan"),
  });
  try {
    const validation = await schema.validate(data);
    return null;
  } catch (error) {
    // return error?.errors[0];
  }
}

module.exports.validate_account = validate_account;
