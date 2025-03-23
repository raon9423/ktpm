const { activity_participants, activities, students } = require("../models");
const { body, validationResult } = require("express-validator");

// Middleware validate dữ liệu
const validateActivityParticipant = [
  body("activity_id").notEmpty().withMessage("Activity ID is required"),
];

// 📌 Lấy danh sách tất cả Activity Participants
const getActivityParticipants = async (req, res) => {
  try {
    const participants = await activity_participants.findAll({
      include: [
        { model: activities, as: "activities" },
        { model: students, as: "student" },
      ],
    });
    res.json(participants);
  } catch (error) {
    console.error("Error fetching activity participants:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// 📌 Lấy thông tin một Activity Participant theo ID
const getActivityParticipantById = async (req, res) => {
  try {
    const participant = await activity_participants.findOne({
      where: { id: req.params.id },
      include: [
        { model: activities, as: "activities" },
        { model: users, as: "user" },
      ],
    });

    if (!participant)
      return res.status(404).json({ message: "Participant not found" });

    res.json(participant);
  } catch (error) {
    console.error("Error fetching participant by ID:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// 📌 Thêm mới một Activity Participant
const createActivityParticipant = [
  validateActivityParticipant,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { activity_id, user_id } = req.body;

    try {
      const participant = await activity_participants.create({
        activity_id,
        user_id,
      });

      const participantWithDetails = await activity_participants.findOne({
        where: { id: participant.id },
        include: [
          { model: activities, as: "activities" },
          { model: users, as: "user" },
        ],
      });

      res.status(201).json(participantWithDetails);
    } catch (error) {
      console.error("Error creating activity participant:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
];

// 📌 Cập nhật Activity Participant
const updateActivityParticipant = [
  validateActivityParticipant,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { activity_id, user_id } = req.body;

    try {
      const participant = await activity_participants.findByPk(req.params.id);
      if (!participant)
        return res.status(404).json({ message: "Participant not found" });

      await participant.update({ activity_id, user_id });

      const updatedParticipant = await activity_participants.findOne({
        where: { id: participant.id },
        include: [
          { model: activities, as: "activities" },
          { model: users, as: "user" },
        ],
      });

      res.json(updatedParticipant);
    } catch (error) {
      console.error("Error updating participant:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
];

// 📌 Xóa Activity Participant
const deleteActivityParticipant = async (req, res) => {
  try {
    const participant = await activity_participants.findByPk(req.params.id);
    if (!participant)
      return res.status(404).json({ message: "Participant not found" });

    await participant.destroy();
    res.status(204).json({ message: "Participant deleted successfully" });
  } catch (error) {
    console.error("Error deleting participant:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  getActivityParticipants,
  getActivityParticipantById,
  createActivityParticipant,
  updateActivityParticipant,
  deleteActivityParticipant,
};
