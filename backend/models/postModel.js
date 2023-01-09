const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    coinId: {
      type: String,
    },
    tagId: {
      type: String,
    },
    text: {
      type: String,
    },
    votes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        commUserId: {
          type: String,
        },
        commText: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("Post", postSchema);
