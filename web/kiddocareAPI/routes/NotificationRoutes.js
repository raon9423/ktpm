const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/NotificationController");

router.get("/", notificationController.getAllNotifications);
router.get("/:user_id", notificationController.getNotificationsByUser);
router.post("/", notificationController.sendNotification);
router.delete("/:id", notificationController.deleteNotification);

module.exports = router;
