const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 60,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
