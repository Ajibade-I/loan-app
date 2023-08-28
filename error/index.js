const BadRequestError = require("./bad-request");
const CustomApiError = require("./custom-api ");
const NOtFoundError = require("./not-found");
const Unauthenticated = require("./unauthenticated");
const Unauthorized = require("./unauthorized");

module.exports = {
  BadRequestError,
  NOtFoundError,
  Unauthenticated,
  Unauthorized,
  CustomApiError,
};
