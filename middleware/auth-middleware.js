const jwt = require("jsonwebtoken");
const { User } = require("../models/users");

const jwt_secret = process.env.PRIVATE_KEY;

const is_login = async (req, res, next) => {
  let token;
  // console.log(req.cookies);
  const accessToken = req.signedCookies?.accessToken;
  if (accessToken) {
    const payload = jwt.verify(accessToken, "Ajibade");
    // console.log(payload);
  }
  // console.log(req.session);
  // console.log(req.session?.token);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, jwt_secret);

      req.user = await User.findById(decoded._id).select("-password");
      if (!req.user) {
        throw new Error("Invalid user");
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Please login to continues" });
    }
  }
};

const is_admin = async (req, res, next) => {
  if (req.user.role === "user" || !req.user.isAuthorizedAdmin) {
    res.status(403).json({ message: "You are not an admin" });
  }
  next();
};

module.exports.is_login = is_login;
module.exports.is_admin = is_admin;
