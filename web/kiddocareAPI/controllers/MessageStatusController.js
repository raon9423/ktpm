const { message_status } = require("../models");

// Cập nhật trạng thái tin nhắn (đã đọc)
const updateMessageStatus = async (req, res) => {
  try {
    const { message_id, user_id, status } = req.body;
    const updated = await message_status.update({ status }, { where: { message_id, user_id } });

    if (!updated) return res.status(404).json({ message: "Message status not found" });
    res.json({ message: "Message status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateMessageStatus,
};
