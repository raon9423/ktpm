const express = require("express");
const router = express.Router();
const messageController = require("../controllers/MessageController");

// Lấy tin nhắn theo phòng chat
router.get("/:chat_room_id", messageController.getMessagesByChatRoom);

// Gửi tin nhắn mới
router.post("/", messageController.sendMessage);

// Xóa tin nhắn
router.delete("/:id", messageController.deleteMessage);

module.exports = router;
