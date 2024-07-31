const User = require("../model/userModel");
const resError = require("../tools/resError");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");

exports.fetchUser = catchAsyncError(async (req, res, next) => {
  const { dToken } = req.cookies;

  if (!dToken) {
    return resError(401, "Please authenticate using a valid token", res);
  }

  const data = jwt.verify(dToken, process.env.JWT_SECRET);
  req.user = await User.findById(data.user.id);

  next();
});

exports.authRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return resError(
        403,
        `Role: ${req.user.role} is not allowed to access this resource`,
        res
      );
    }
    next();
  };
};
