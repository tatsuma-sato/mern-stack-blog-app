const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    imageSrc: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    editDate: {
      type: Date,
      default: null,
    },
    content: {
      type: String,
      required: [true, "Please add a content"],
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
