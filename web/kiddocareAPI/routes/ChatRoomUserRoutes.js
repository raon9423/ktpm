const express = require('express');
const router = express.Router();
const chatRoomUserController = require('../controllers/ChatRoomUserController');

router.get('/', chatRoomUserController.getAllChatRoomUsers);
router.get('/room/:room_id', chatRoomUserController.getUsersByChatRoom);
router.get('/user/:user_id', chatRoomUserController.getChatRoomsByUser);
router.post('/', chatRoomUserController.addChatRoomUser);
router.delete('/:room_id/:user_id', chatRoomUserController.removeChatRoomUser);

module.exports = router;