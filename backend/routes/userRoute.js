const express = require("express");
const { registerUser, loginUser, logOutUser } = require("../controller/userController");
const router = express.Router();
const { fetchUser, authRole } = require("../middleware/auth");

router.route("/auth/register").post(registerUser);
router.route("/auth/login").post(loginUser);
router.route("/auth/logout").get(fetchUser, logOutUser);
module.exports = router;
