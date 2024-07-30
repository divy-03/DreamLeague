const express = require("express");
const { registerUser } = require("../controller/userController");
const router = express.Router();

router.route("/auth/register").post(registerUser);

module.exports = router;
