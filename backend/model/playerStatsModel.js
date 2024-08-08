const mongoose = require("mongoose");

const playerStatisticsSchema = new mongoose.Schema(
  {
    sid: { type: mongoose.Schema.Types.ObjectId, auto: true },
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    matches: { type: Number, default: 0 },
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    yellow: { type: Number, default: 0 },
    red: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlayerStatistic", playerStatisticsSchema);
