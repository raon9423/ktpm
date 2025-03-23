const express = require("express");
const router = express.Router();
const chatRoomController = require("../controllers/ChatRoomController");

router.get("/", chatRoomController.getChatRooms);
router.get("/:id", chatRoomController.getChatRoomById);
router.post("/", chatRoomController.createChatRoom);
router.put("/:id", chatRoomController.updateChatRoom);
router.delete("/:id", chatRoomController.deleteChatRoom);

module.exports = router;