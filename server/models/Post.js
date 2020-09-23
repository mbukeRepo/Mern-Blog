const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 3,
      max: 60,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
      min: 3,
      max: 1000,
    },
    photo: {
      type: String,
    },
    user: {
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
