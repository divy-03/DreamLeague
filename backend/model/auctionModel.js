const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
  {
    aid: { type: mongoose.Schema.Types.ObjectId, auto: true },
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    baseAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auction", auctionSchema);
