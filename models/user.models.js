const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
    },
    ensName: {
      type: String,
      default: "null",
    },
    ensAvatar: {
      type: String,
      default: "null",
    },
    username: {
      type: String,
      required: true,
    },
    userProfileImage: {
      type: String,
      default: "someRandomImage",
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ethindia_users", userSchema);
