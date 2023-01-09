const mongoose = require("mongoose");

const tagSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("Tag", tagSchema);
