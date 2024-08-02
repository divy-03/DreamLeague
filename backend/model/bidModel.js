const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    bid_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    auction_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
      required: true,
    },
    captain_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Captain",
      required: true,
    },
    bid_amount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bid", bidSchema);
