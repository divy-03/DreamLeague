const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    // bid: { type: mongoose.Schema.Types.ObjectId, auto: true },
    aid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
      required: true,
    },
    cid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Captain",
      required: true,
    },
    bidAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bid", bidSchema);
