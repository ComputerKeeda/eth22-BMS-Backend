const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema(
  {
    senderAddress: {
      type: String,
      required: true,
    },
    receiverAddress: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
    },
    attachment: {
      type: String,
      default: "null",
    },
    transactionHash  : {
      type: String,
      default: "--",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ethindia_mail", mailSchema);
