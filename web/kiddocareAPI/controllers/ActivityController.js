const { activities, teacher_activities, users } = require("../models");
const { body, validationResult } = require("express-validator");
const { Op } = require("sequelize");

// Validation middleware cho createActivity và updateActivity
const validateActivity = [
  body("name").notEmpty().withMessage("Activity name is required"),
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),
  body("teacher_id")
    .optional()
    .isInt()
    .withMessage("Teacher ID must be an integer"),
];

// Lấy danh sách hoạt động
const getActivities = async (req, res) => {
  try {
    const allActivities = await activities.findAll();
    res.json(allActivities);
  } catch (error) {
    console.error("Error fetching activities:", error);   
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Lấy activity theo ID
const getActivityById = async (req, res) => {
  try {
    const activity = await activities.findOne({
      where: { id: req.params.id },
    });

    if (!activity)
      return res.status(404).json({ message: "Activity not found" });

    res.json(activity);
  } catch (error) {
    console.error("Error fetching activity by ID:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Tạo mới activity
const createActivity = [
  validateActivity,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, teacher_id } = req.body;

    try {
      const newActivity = await activities.create({ name, description });

      const activityWithTeachers = await activities.findOne({
        where: { id: newActivity.id },
      });

      res.status(201).json(activityWithTeachers);
    } catch (error) {
      console.error("Error creating activity:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
];

// Cập nhật activity
const updateActivity = [
  validateActivity,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const activityId = req.params.id;
    const { name, description, teacher_id } = req.body;

    try {
      const activity = await activities.findByPk(activityId);
      if (!activity)
        return res.status(404).json({ message: "Activity not found" });

      await activity.update({ name, description });

      await activity.reload({
        include: { model: users, as: "teachers", through: { attributes: [] } },
      });

      res.json(activity);
    } catch (error) {
      console.error("Error updating activity:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
];

// Xóa activity
const deleteActivity = async (req, res) => {
  try {
    const activity = await activities.findByPk(req.params.id);
    if (!activity)
      return res.status(404).json({ message: "Activity not found" });

    await activity.destroy();

    res.status(204).json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};
