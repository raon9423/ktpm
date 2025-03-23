const { extracurricular_activities } = require("../models");

// Lấy danh sách tất cả hoạt động ngoại khóa
const getAllActivities = async (req, res) => {
  try {
    const data = await extracurricular_activities.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy chi tiết một hoạt động theo ID
const getActivityById = async (req, res) => {
  try {
    const activity = await extracurricular_activities.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ error: "Activity not found" });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm mới một hoạt động ngoại khóa
const addActivity = async (req, res) => {
  try {
    const { name, description, activity_date } = req.body;
    const newActivity = await extracurricular_activities.create({
      name,
      description,
      activity_date,
    });
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin hoạt động
const updateActivity = async (req, res) => {
  try {
    const { name, description, activity_date } = req.body;
    const activity = await extracurricular_activities.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ error: "Activity not found" });

    await activity.update({ name, description, activity_date });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa một hoạt động
const deleteActivity = async (req, res) => {
  try {
    const activity = await extracurricular_activities.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ error: "Activity not found" });

    await activity.destroy();
    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllActivities,
  getActivityById,
  addActivity,
  updateActivity,
  deleteActivity,
};
