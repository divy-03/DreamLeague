const catchAsyncError = require("../middleware/catchAsyncError");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary");
const User = require("../model/userModel");

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

  res.status(201).json({
    success: true,
    user,
  });
});
