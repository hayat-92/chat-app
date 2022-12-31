const mongoose = require("mongoose");
const Chat = require("./chatModel");
const User = require("./userModel");

const NotificationModel = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    content: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const Notify = mongoose.model("Notify", NotificationModel);
module.exports = Notify;
