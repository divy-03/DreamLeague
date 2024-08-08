const mongoose = require("mongoose");

const playerRatingSchema = new mongoose.Schema(
  {
    rid: { type: mongoose.Schema.Types.ObjectId, auto: true },
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlayerRating", playerRatingSchema);
