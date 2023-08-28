const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      maxlength: 50,
      minlength: 2,
      required: true,
    },
    last_name: {
      type: String,
      maxlength: 50,
      minlength: 2,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      maxlength: 15,
      required: true,
    },
    password: {
      type: String,
      maxlength: 250,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isAuthorizedAdmin: {
      type: Boolean,
      default: false,
    },
    hasLoanRequest: {
      type: Boolean,
      default: false,
    },
    hasUnfullfilledLoan: {
      type: Boolean,
      default: false,
    },
    accountBalance: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userschema);

module.exports.User = User;
