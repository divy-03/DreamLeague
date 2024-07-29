const express = require("express");
const { check } = require("../controller/userController");
const router = express.Router();

router.route("/check").get(check);

module.exports = router;
