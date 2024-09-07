const mongoose = require("mongoose");

const captainSchema = new mongoose.Schema(
  {
    // cid: { type: mongoose.Schema.Types.ObjectId, auto: true },
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balance: { type: Number, default: 0, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Captain", captainSchema);
