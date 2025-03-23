const { chat_rooms, chat_room_users, users } = require("../models");

const getChatRooms = async (req, res) => {
  try {
    const data = await chat_rooms.findAll({
      include: [
        {
          model: chat_room_users,
          as: "chat_room_users",
          include: [
            {
              model: users,
              as: "users",
              attributes: ["id", "full_name", "email", "avt_link"],
            },
          ],
        },
      ],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy chat room theo ID
const getChatRoomById = async (req, res) => {
  try {
    const chatRoomData = await chat_room.findByPk(req.params.id, {
      include: [
        {
          model: chat_room_users,
          as: "users",
          include: [
            {
              model: users,
              as: "users",
              attributes: ["id", "full_name", "email", "avatar"],
            },
          ],
        },
      ],
    });
    if (!chatRoomData)
      return res.status(404).json({ message: "Chat room not found" });
    res.json(chatRoomData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tạo mới chat room
const createChatRoom = async (req, res) => {
  try {
    const newChatRoom = await chat_rooms.create(req.body);
    res.status(201).json(newChatRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật chat room
const updateChatRoom = async (req, res) => {
  try {
    const updated = await chat_rooms.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated)
      return res.status(404).json({ message: "Chat room not found" });
    res.json({ message: "Chat room updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa chat room
const deleteChatRoom = async (req, res) => {
  try {
    await chat_rooms.destroy({ where: { id: req.params.id } });
    res.json({ message: "Chat room deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getChatRooms,
  getChatRoomById,
  createChatRoom,
  updateChatRoom,
  deleteChatRoom,
};
