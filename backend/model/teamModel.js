const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    tid: { type: mongoose.Schema.Types.ObjectId, auto: true },
    cid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Captain",
      required: true,
    },
    tname: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
