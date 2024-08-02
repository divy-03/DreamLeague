const mongoose = require("mongoose");

const teamPlayerSchema = new mongoose.Schema(
  {
    team_player_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    player_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamPlayer", teamPlayerSchema);
