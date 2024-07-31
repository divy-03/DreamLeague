const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "please enter an Email"],
    unique: [true, "Email already exist"],
    validate: [validator.isEmail, "Invalid Email"],
  },
  password: {
    type: String,
    required: [true, "Please create password"],
    select: false,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  position: String,
  role: {
    type: String,
    default: "user",
  },
  rating: {
    type: Number,
    default: 1,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
