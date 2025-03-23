const { teacher_activities, users, activities } = require("../models");

// Lấy danh sách tất cả giáo viên và hoạt động của họ
const getAllTeacherActivities = async (req, res) => {
  try {
    const data = await teacher_activities.findAll({
      include: [
        { model: users, as: "teacher", attributes: ["id", "full_name"] },
        { model: activities, as: "activity", attributes: ["id", "name"] },
      ],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin cụ thể một hoạt động của giáo viên
const getTeacherActivityById = async (req, res) => {
  try {
    const record = await teacher_activities.findByPk(req.params.id, {
      include: [
        { model: users, as: "teacher", attributes: ["id", "full_name"] },
        { model: activities, as: "activity", attributes: ["id", "name"] },
      ],
    });

    if (!record) return res.status(404).json({ error: "Record not found" });

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm giáo viên vào hoạt động
const createTeacherActivity = async (req, res) => {
  try {
    const { teacher_id, activity_id } = req.body;
    const newRecord = await teacher_activities.create({
      teacher_id,
      activity_id,
    });

    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật hoạt động của giáo viên
const updateTeacherActivity = async (req, res) => {
  try {
    const recordId = req.params.id;
    const updated = await teacher_activities.update(req.body, {
      where: { id: recordId },
    });

    if (!updated[0]) return res.status(404).json({ error: "Record not found" });

    res.json({ message: "Record updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa hoạt động của giáo viên
const deleteTeacherActivity = async (req, res) => {
  try {
    const recordId = req.params.id;
    const deleted = await teacher_activities.destroy({
      where: { id: recordId },
    });

    if (!deleted) return res.status(404).json({ error: "Record not found" });

    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTeacherActivities,
  getTeacherActivityById,
  createTeacherActivity,
  updateTeacherActivity,
  deleteTeacherActivity,
};
