const { notifications, users } = require("../models");

// Lấy danh sách tất cả thông báo
const getAllNotifications = async (req, res) => {
  try {
    const data = await notifications.findAll({
      include: {
        model: users,
        as: "recipient",
        attributes: ["id", "full_name", "email"],
      },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông báo của một người dùng cụ thể
const getNotificationsByUser = async (req, res) => {
  try {
    const userNotifications = await notifications.findAll({
      where: { recipient_id: req.params.user_id },
      include: {
        model: users,
        as: "recipient",
        attributes: ["id", "full_name", "email"],
      },
    });
    res.json(userNotifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Gửi một thông báo mới
const sendNotification = async (req, res) => {
  try {
    const { title, message, recipient_id } = req.body;
    const newNotification = await notifications.create({
      title,
      message,
      recipient_id,
    });
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa một thông báo
const deleteNotification = async (req, res) => {
  try {
    const notification = await notifications.findByPk(req.params.id);
    if (!notification)
      return res.status(404).json({ error: "Notification not found" });

    await notification.destroy();
    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllNotifications,
  getNotificationsByUser,
  sendNotification,
  deleteNotification,
};
