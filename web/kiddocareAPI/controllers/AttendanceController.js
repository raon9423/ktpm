const { attendance, students, classes, users } = require("../models");
const { body, validationResult } = require("express-validator");

// Middleware validate input
const validateAttendance = [
  body("student_id").isInt().withMessage("Student ID must be an integer"),
  body("class_id").isInt().withMessage("Class ID must be an integer"),
  body("teacher_id").isInt().withMessage("Teacher ID must be an integer"),
  body("status")
    .isIn(["present", "absent", "late", "excused"])
    .withMessage("Invalid attendance status"),
  body("date").isISO8601().toDate().withMessage("Date must be a valid date"),
];

// Lấy tất cả điểm danh
const getAllAttendance = async (req, res) => {
  try {
    const data = await attendance.findAll({
      include: [
        { model: students, as: "student" },
        { model: classes, as: "class" },
      ],
    });
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Lấy điểm danh theo ID
const getAttendanceById = async (req, res) => {
  try {
    const record = await attendance.findByPk(req.params.id, {
      include: [
        { model: students, as: "student" },
        { model: classes, as: "class" },
      ],
    });

    if (!record)
      return res.status(404).json({ message: "Attendance record not found" });

    res.json(record);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Tạo mới điểm danh
const createAttendance = [
  validateAttendance,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newAttendance = await attendance.create(req.body);
      res.status(201).json(newAttendance);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
];

// Cập nhật điểm danh
const updateAttendance = [
  validateAttendance,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const record = await attendance.findByPk(req.params.id);
      if (!record)
        return res.status(404).json({ message: "Attendance record not found" });

      await record.update(req.body);
      res.json(record);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
];

// Xóa điểm danh
const deleteAttendance = async (req, res) => {
  try {
    const record = await attendance.findByPk(req.params.id);
    if (!record)
      return res.status(404).json({ message: "Attendance record not found" });

    await record.destroy();
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  getAllAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
};
