const mongoose = require("mongoose");

const playerStatisticsSchema = new mongoose.Schema(
  {
    stat_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    player_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    matches_played: { type: Number, default: 0 },
    goals_scored: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    yellow_cards: { type: Number, default: 0 },
    red_cards: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlayerStatistic", playerStatisticsSchema);
