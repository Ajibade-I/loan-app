const { BadRequestError } = require("../error");
const { Account } = require("../models/accounts");
const { validate_account } = require("../validation/accountvalidation");

const create_account = async (req, res, next) => {
  const error = await validate_account(req.body);
  if (error) {
    throw new BadRequestError(error);
  }

  const { name, accountBalance, minLoan, maxLoan } = req.body;

  const account = new Account({
    name,
    accountBalance,
    minLoan,
    maxLoan,
  });
  await account.save();
  res.status(201).json({ message: "Account created succesfully" });
};

module.exports.create_account = create_account;
