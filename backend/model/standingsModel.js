const mongoose = require("mongoose");

const teamStandingsSchema = new mongoose.Schema(
  {
    standing_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    matches_played: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamStanding", teamStandingsSchema);
