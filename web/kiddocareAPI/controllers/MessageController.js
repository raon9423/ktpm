const { messages, users, message_status } = require("../models");

// Lấy tất cả tin nhắn trong phòng chat
const getMessagesByChatRoom = async (req, res) => {
  try {
    const chatRoomId = req.params.chat_room_id;
    const data = await messages.findAll({
      where: { chat_room_id: chatRoomId },
      include: [
        {
          model: users,
          as: "sender",
          attributes: ["id", "full_name", "email", "avt_link"],
        },
        {
          model: message_status,
          as: "statuses",
          attributes: ["user_id", "status"],
        },
      ],
      order: [["sent_at", "ASC"]],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Gửi tin nhắn mới
const sendMessage = async (req, res) => {
  try {
    const { chat_room_id, sender_id, content, message_type } = req.body;
    const newMessage = await messages.create({
      chat_room_id,
      sender_id,
      content,
      message_type,
    });

    // Tạo trạng thái "sent" cho tất cả user trong phòng chat
    const chatRoomUsers = await users.findAll({ where: { chat_room_id } });
    for (let u of chatRoomUsers) {
      await message_status.create({
        message_id: newMessage.id,
        user_id: u.id,
        status: u.id === sender_id ? "sent" : "delivered",
      });
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa tin nhắn
const deleteMessage = async (req, res) => {
  try {
    await messages.destroy({ where: { id: req.params.id } });
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMessagesByChatRoom,
  sendMessage,
  deleteMessage,
};
