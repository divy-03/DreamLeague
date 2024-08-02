const catchAsyncError = require("../middleware/catchAsyncError");
const { check, validationResult } = require("express-validator");
const resError = require("../tools/resError");
const resSuccess = require("../tools/resSuccess");
const sendEmail = require("../tools/sendEmail");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
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

exports.logOutUser = catchAsyncError(async (req, res) => {
  res.clearCookie("dToken", { path: "/" });
  return resSuccess(200, "Logged Out Successfully", res);
});

exports.forgotPassword = catchAsyncError(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return resError(404, "User not found", res);
  }

  // Get resetPasswordToken
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset link is => \n\n ${resetPasswordUrl} \n\nIf you have not requested to reset password then please ignore this mail`;

  try {
    await sendEmail({
      email: user.email,
      subject: "DreamLeague Password Recovery",
      message: message,
      html: `<div style="background-image: linear-gradient(to right bottom, #ae95ffab 40%, rgb(210, 103, 117, 0.4)); margin:0;">
        <h1 style="color: #333; margin-left: 10px;">Password Reset Link</h1>
        <p style="font-size: 16px; margin-left:20px;">Click this link below to reset your password of DreamLeague Website</p>
        <a href="${resetPasswordUrl}" style="text-decoration: none; background: black; color: white; border-radius: 8px; padding: 10px; text-align: center; width: 80px; margin-left: 50px; transition: background 0.3s;" onmouseover="this.style.background='rgb(45 45 45)'"
        onmouseout="this.style.background='black'">Click Here!</a>
        <p style="font-size: 16px; margin-left:20px;">If you didn't requested to reset password then please ignore this mail</p>
  </div>`,
    });

    resSuccess(200, `Email sent to ${user.email}`, res);
  } catch (error) {
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save({ validateBeforeSave: false });

    return resError(500, error.stack, res);
  }
});

exports.resetPassword = catchAsyncError(async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return resError(400, "Reset Password link is invalid or expired", res);
  }

  if (req.body.password !== req.body.confirmPassword) {
    return resError(400, "Password doesn't match", res);
  }

  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);

  user.password = secPass;

  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();

  sendToken(user, 200, res);
});

exports.getUserDetails = catchAsyncError(async (req, res) => {
  const userId = req.user.user_id;
  const user = await User.findOne({ userId });

  if (!user) {
    return resError(404, "User not found", res);
  }
  return res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = catchAsyncError(async (req, res) => {
  const user = await User.findOne(req.user._id).select("+password");

  const passwordCompare = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );

  if (!passwordCompare) {
    return resError(401, "Password not matched", res);
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return resError(401, "New password not matched", res);
  }

  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.newPassword, salt);

  user.password = secPass;

  await user.save();

  return sendToken(user, 200, res);
});

exports.updateProfile = catchAsyncError(async (req, res) => {
  const userId = req.user.user_id;
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    position: req.body.position,
  };

  if (req.body.avatar === "noImg") {
    await User.findByIdAndUpdate(userId, newUserData, {
      new: true,
      runValidators: true,
    });

    return resSuccess(200, "Profile updated successfully", res);
  }

  const avt = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 300,
    crop: "scale",
  });

  if (avt) {
    newUserData.avatar = {
      public_id: avt.public_id,
      url: avt.secure_url,
    };
  }

  await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidators: true,
  });

  resSuccess(200, "Profile updated successfully", res);
});

// ADMIN --- Routes
exports.getAllUsers = catchAsyncError(async (req, res) => {
  const users = await User.find({});

  return res.status(200).json({
    success: true,
    usersCount: users.length,
    users,
  });
});

exports.getUser = catchAsyncError(async (req, res) => {
  const user = await User.findById(req.params.user_id);

  if (!user) {
    return resError(404, `User not found with id: ${req.params.user_id}`);
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

exports.editUserRole = catchAsyncError(async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.user_id, newUserData, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });

  if (!user) {
    return resError(404, "User not found", res);
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

exports.deleteUser = catchAsyncError(async (req, res) => {
  const user = await User.findById(req.params.user_id);

  if (!user) {
    return resError(404, `User not found`, res);
  }

  const imgId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imgId);
  await user.deleteOne();

  resSuccess(200, `User with id: ${req.params.user_id} deleted successfully`, res);
});

exports.ratePlayer = catchAsyncError(async (req, res) => {
  const { userId, rating } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return resError(404, `User not found`, res);
  }
});
