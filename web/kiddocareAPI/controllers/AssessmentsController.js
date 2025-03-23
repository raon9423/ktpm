const { assessments, students, activities, users } = require("../models");
const { body, validationResult } = require("express-validator");

// Middleware validate input
const validateAssessment = [
  body("student_id").isInt().withMessage("Student ID must be an integer"),
  body("activity_id").isInt().withMessage("Activity ID must be an integer"),
  body("teacher_id").isInt().withMessage("Teacher ID must be an integer"),
  body("assessment_type")
    .isIn(["exam", "quiz", "assignment", "participation", "project", "remark"])
    .withMessage("Invalid assessment type"),
  body("score")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Score must be a number between 0 and 100"),
  body("comments")
    .optional()
    .isString()
    .withMessage("Comments must be a string"),
  body("date").isISO8601().toDate().withMessage("Date must be a valid date"),
];

// Lấy tất cả assessments
const getAssessments = async (req, res) => {
  try {
    const data = await assessments.findAll({
      include: [
        { model: students, as: "student" },
        { model: activities, as: "activity" },
        { model: users, as: "teacher" },
      ],
    });
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Lấy assessment theo ID
const getAssessmentById = async (req, res) => {
  try {
    const assessment = await assessments.findByPk(req.params.id, {
      include: [
        { model: students, as: "student" },
        { model: activities, as: "activity" },
        { model: users, as: "teacher" },
      ],
    });

    if (!assessment)
      return res.status(404).json({ message: "Assessment not found" });

    res.json(assessment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Tạo mới assessment
const createAssessment = [
  validateAssessment,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newAssessment = await assessments.create(req.body);
      res.status(201).json(newAssessment);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
];

// Cập nhật assessment
const updateAssessment = [
  validateAssessment,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const assessment = await assessments.findByPk(req.params.id);
      if (!assessment)
        return res.status(404).json({ message: "Assessment not found" });

      await assessment.update(req.body);
      res.json(assessment);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
];

// Xóa assessment
const deleteAssessment = async (req, res) => {
  try {
    const assessment = await assessments.findByPk(req.params.id);
    if (!assessment)
      return res.status(404).json({ message: "Assessment not found" });

    await assessment.destroy();
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  getAssessments,
  getAssessmentById,
  createAssessment,
  updateAssessment,
  deleteAssessment,
};
