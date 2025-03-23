const { schedule, classes, users } = require("../models");

// Lấy danh sách lịch học
const getAllSchedules = async (req, res) => {
  try {
    const data = await schedule.findAll({
      include: [
        {
          model: classes,
          as: "class",
          attributes: ["id", "name"],
        },
        {
          model: users,
          as: "teacher",
          attributes: ["id", "full_name", "email"],
        },
      ],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy lịch học của một lớp cụ thể
const getScheduleByClass = async (req, res) => {
  try {
    const classSchedules = await schedule.findAll({
      where: { class_id: req.params.class_id },
      include: [
        {
          model: classes,
          as: "class",
          attributes: ["id", "name"],
        },
        {
          model: users,
          as: "teacher",
          attributes: ["id", "full_name", "email"],
        },
      ],
    });
    res.json(classSchedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tạo lịch học mới
const createSchedule = async (req, res) => {
  try {
    const { class_id, day_of_week, start_time, end_time, subject, teacher_id } =
      req.body;
    const newSchedule = await schedule.create({
      class_id,
      day_of_week,
      start_time,
      end_time,
      subject,
      teacher_id,
    });
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật lịch học
const updateSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    const updated = await schedule.update(req.body, {
      where: { id: scheduleId },
    });

    if (!updated[0])
      return res.status(404).json({ error: "Schedule not found" });

    res.json({ message: "Schedule updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa lịch học
const deleteSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    const deleted = await schedule.destroy({ where: { id: scheduleId } });

    if (!deleted) return res.status(404).json({ error: "Schedule not found" });

    res.json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSchedules,
  getScheduleByClass,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
