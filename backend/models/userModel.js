const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pleasr add a name"],
    },
    email: {
      type: String,
      required: [true, "Pleasr add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
