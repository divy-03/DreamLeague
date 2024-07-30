const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
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
});

module.exports = mongoose.model("User", userSchema);
