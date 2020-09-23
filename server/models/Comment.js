const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      required: true,
      min: 3,
      max: 1000,
    },
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
