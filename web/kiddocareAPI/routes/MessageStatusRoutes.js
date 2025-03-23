const express = require("express");
const router = express.Router();
const messageStatusController = require("../controllers/MessageStatusController");

// Cập nhật trạng thái tin nhắn
router.put("/", messageStatusController.updateMessageStatus);

module.exports = router;
