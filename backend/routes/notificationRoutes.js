const express = require("express");
const {
  getNotification,
  sendNotification,
} = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleWare");
const router = express.Router();

router.route("/").get(protect, getNotification);
router.route("/").post(protect, sendNotification);

module.exports = router;
