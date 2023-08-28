const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./custom-api ");

class Unauthorized extends CustomApiError {
  constructor(message) {
    super(message);
    this.statuscode = StatusCodes.Unauthorized;
  }
}
module.exports = Unauthorized;
