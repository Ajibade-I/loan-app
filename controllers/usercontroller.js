const { BadRequestError } = require("../error");
const { User } = require("../models/users");
const {
  validate_signup,
  validate_login,
} = require("../validation/uservalidation");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user_signup = async (req, res, next) => {
  const error = await validate_signup(req.body);
  if (error) {
    throw new BadRequestError(error);
  }

  const { first_name, last_name, email, phone, password } = req.body;

  const email_exist = await User.findOne({ email });
  if (email_exist) {
    throw new BadRequestError("User already exists");
  }

  const phone_exist = await User.findOne({ phone });
  if (phone_exist) {
    throw new BadRequestError("Phone number already exists");
  }

  const salt = await bcryptjs.genSalt(10);
  const hashed_password = await bcryptjs.hash(password, salt);

  const user = new User({
    first_name,
    last_name,
    email,
    phone,
    password: hashed_password,
  });

  await user.save();

  res.status(201).json({ msg: "Sign up succesfull!!" });
};

const user_login = async (req, res, next) => {
  const error = await validate_login(req.body);
  if (error) {
    throw new BadRequestError(error);
  }
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!email) {
    throw new BadRequestError("Invalid email or password");
  }

  const user_password = await bcryptjs.compare(password, user.password);
  if (!user_password) {
    throw new BadRequestError("Invalid email or password");
  }

  const payload = {
    email: user.email,
    _id: user._id,
  };
  const token = jwt.sign(payload, "Ajibade", {
    expiresIn: "1d",
  });

  const one_day = 100 * 24 * 60 * 60;
  // res.cookie("accessToken", token, {
  //   httpOnly: true,
  //   secure: true,
  //   signed: true,
  //   expires: new Date(Date.now() + one_day),
  //   sameSite: "none",
  // });
  res.status(200).json({ message: "Login succesfull", jwt: token });
};

const Get_users = async (req, res, next) => {
  const users = await User.find({}).select("-password -isAuthorizedAdmin");
  res.json({ users });
};

const Get_profile = async (req, res, next) => {
  const query = req.params._id;
  const user = await user;
};

module.exports.user_login = user_login;
module.exports.user_signup = user_signup;
module.exports.Get_users = Get_users;
