const { class_activities, classes, activities } = require("../models");

// Lấy danh sách tất cả class_activities
const getAllClassActivities = async (req, res) => {
  try {
    const data = await class_activities.findAll({
      include: [
        { model: classes, as: "class" },
        { model: activities, as: "activity" },
      ],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách activities theo class_id
const getActivitiesByClass = async (req, res) => {
  try {
    const data = await class_activities.findAll({
      where: { class_id: req.params.class_id },
      include: [{ model: activities, as: "activity" }],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách classes theo activity_id
const getClassesByActivity = async (req, res) => {
  try {
    const data = await class_activities.findAll({
      where: { activity_id: req.params.activity_id },
      include: [{ model: classes, as: "class" }],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm liên kết class - activity
const addClassActivity = async (req, res) => {
  try {
    const { class_id, activity_id } = req.body;
    const newLink = await class_activities.create({ class_id, activity_id });
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa liên kết class - activity
const removeClassActivity = async (req, res) => {
  try {
    const { class_id, activity_id } = req.params;
    await class_activities.destroy({ where: { class_id, activity_id } });
    res.json({ message: "Class-Activity link deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllClassActivities,
  getActivitiesByClass,
  getClassesByActivity,
  addClassActivity,
  removeClassActivity,
};
