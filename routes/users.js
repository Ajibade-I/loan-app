const express = require("express");
const { user_signup, user_login } = require("../controllers/usercontroller");
const router = express.Router();

router.post("/signup", user_signup);
router.post("/login", user_login);

module.exports = router;
