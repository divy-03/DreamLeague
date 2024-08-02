const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    team_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    captain_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Captain",
      required: true,
    },
    team_name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
