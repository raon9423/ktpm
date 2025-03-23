const { feedback, users } = require("../models");

// Lấy danh sách tất cả feedback
const getAllFeedback = async (req, res) => {
  try {
    const data = await feedback.findAll({
      include: {
        model: users,
        as: "user",
        attributes: ["id", "full_name", "email"],
      },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy chi tiết một feedback theo ID
const getFeedbackById = async (req, res) => {
  try {
    const feedbackData = await feedback.findByPk(req.params.id, {
      include: {
        model: users,
        as: "user",
        attributes: ["id", "full_name", "email"],
      },
    });
    if (!feedbackData)
      return res.status(404).json({ error: "Feedback not found" });
    res.json(feedbackData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm mới một feedback
const addFeedback = async (req, res) => {
  try {
    const { user_id, rating, comments } = req.body;
    if (rating < 1 || rating > 5)
      return res.status(400).json({ error: "Rating must be between 1 and 5" });

    const newFeedback = await feedback.create({ user_id, rating, comments });
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật feedback
const updateFeedback = async (req, res) => {
  try {
    const { rating, comments } = req.body;
    const feedbackData = await feedback.findByPk(req.params.id);
    if (!feedbackData)
      return res.status(404).json({ error: "Feedback not found" });

    await feedbackData.update({ rating, comments });
    res.json(feedbackData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa feedback
const deleteFeedback = async (req, res) => {
  try {
    const feedbackData = await feedback.findByPk(req.params.id);
    if (!feedbackData)
      return res.status(404).json({ error: "Feedback not found" });

    await feedbackData.destroy();
    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllFeedback,
  getFeedbackById,
  addFeedback,
  updateFeedback,
  deleteFeedback,
};
