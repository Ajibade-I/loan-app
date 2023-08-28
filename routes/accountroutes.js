const express = require("express");

const { create_account } = require("../controllers/accountcontroller");
const { is_admin, is_login } = require("../middleware/auth-middleware");
const router = express.Router();
router.post("/create", is_login, is_admin, create_account);
module.exports = router;
