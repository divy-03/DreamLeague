const mongoose = require("mongoose");

const captainSchema = new mongoose.Schema(
  {
    captain_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currency_balance: { type: Number, default: 0, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Captain", captainSchema);
