const mongoose = require("mongoose");

const teamPlayerSchema = new mongoose.Schema(
  {
    tpid: { type: mongoose.Schema.Types.ObjectId, auto: true },
    tid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamPlayer", teamPlayerSchema);
