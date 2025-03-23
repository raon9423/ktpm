const { chat_room_users, users } = require("../models");
const { chat_rooms } = require("../models");
const { messages } = require("../models");
const { message_status } = require("../models");

// Lấy danh sách tất cả chat_room_users
const getAllChatRoomUsers = async (req, res) => {
  try {
    const data = await chat_room_users.findAll({
      include: [
        {
          model: users,
          as: "user",
        },
        {
          model: chat_rooms,
          as: "chat_room",
        },
      ],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả user theo chat_room_id
const getUsersByChatRoom = async (req, res) => {
  try {
    const data = await chat_room_users.findAll({
      where: { chat_room_id: req.params.chat_room_id },
      include: [{ model: users, as: "user" }],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả chat_room theo user_id
const getChatRoomsByUser = async (req, res) => {
  try {
    const data = await chat_room_users.findAll({
      where: { user_id: req.params.user_id },
      include: [{ model: chat_rooms, as: "chat_room" }],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm liên kết user - chat_room
const addChatRoomUser = async (req, res) => {
  try {
    const { chat_room_id, user_id } = req.body;
    const newLink = await chat_room_users.create({ chat_room_id, user_id });
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa liên kết user - chat_room
const removeChatRoomUser = async (req, res) => {
  try {
    const { chat_room_id, user_id } = req.params;
    await chat_room_users.destroy({ where: { chat_room_id, user_id } });
    res.json({ message: "User-ChatRoom link deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllChatRoomUsers,
  getUsersByChatRoom,
  getChatRoomsByUser,
  addChatRoomUser,
  removeChatRoomUser,
};
