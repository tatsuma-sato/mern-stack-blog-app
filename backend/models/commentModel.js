const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    comment: {
      type: String,
      required: [true, "Please add a comment"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
