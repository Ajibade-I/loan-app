const StatusCodes = require("http-status-codes");
const CustomApiError = require("./custom-api ");

class Unauthenticated extends CustomApiError {
  constructor(message) {
    super(message);
    this.statuscode = StatusCodes.Unauthenticated;
  }
}
module.exports = Unauthenticated;
