const asyncHandler = require("express-async-handler");
const Notify = require("../models/notificationModal");
const User = require("../models/userModel");

const sendNotification = asyncHandler(async (req, res) => {
  const { userId, chatId, content, sender } = req.body;
  const data = {
    user: userId,
    sender: sender,
    chat: chatId,
    content: content,
  };

  try {
    var notification = await Notify.create(data);
    notification = await notification.populate("sender", "name, pic");
    notification = await notification.populate("chat");
    notification = await notification.populate("user");
    notification = await User.populate(notification, {
      path: "chat.users",
      select: "name, pic, email",
    });
    res.json(notification);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getNotification = asyncHandler(async (req, res) => {
  try {
    const notifications = await Notify.find({ user: req.body.userId })
      .populate("sender", "name pic email")
      .populate("chat")
      .populate("user");
    res.json(notifications);
  } catch (error) {
    res.status(400);
    throw Error(error.message);
  }
});

module.exports = { sendNotification, getNotification };
