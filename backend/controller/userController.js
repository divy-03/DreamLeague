const catchAsyncError = require("../middleware/catchAsyncError");
const { check, validationResult } = require("express-validator");
const resError = require("../tools/resError");
const resSuccess = require("../tools/resSuccess");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary");
const User = require("../model/userModel");
const sendToken = require("../tools/sendToken");

exports.registerUser = catchAsyncError(async (req, res) => {
  const { name, email, password, avatar } = req.body;

  // Hash the password
  const salt = await bcrypt.genSalt(10); // Async version is recommended
  const secPass = await bcrypt.hash(password, salt);

  // Upload avatar to Cloudinary
  const avt = await cloudinary.v2.uploader.upload(avatar, {
    folder: "avatars",
    width: 300,
    crop: "scale",
  });

  // Create a new user
  const user = await User.create({
    name,
    email,
    password: secPass,
    avatar: {
      public_id: avt.public_id,
      url: avt.secure_url, // Use secure_url for HTTPS
    },
  });

  return sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;
  await check("email", "Please enter a valid email").isEmail().run(req);
  await check("password", "Please enter a valid password")
    .not()
    .isEmpty()
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return resError(400, errors.array(), res);
  } else {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return resError(401, "Invalid email or password", res);
    }
    const savedPassword = user.password;
    const passwordCompare = await bcrypt.compare(password, savedPassword);

    if (!passwordCompare) {
      return resError(401, "Password not matched", res);
    } else {
      return sendToken(user, 200, res);
    }
  }
});
