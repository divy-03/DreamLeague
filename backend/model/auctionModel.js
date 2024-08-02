const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
  {
    auction_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    player_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    starting_bid: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auction", auctionSchema);
