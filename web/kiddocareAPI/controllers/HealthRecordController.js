const { health_records, students } = require("../models");

// Lấy danh sách tất cả hồ sơ sức khỏe
const getAllHealthRecords = async (req, res) => {
  try {
    const data = await health_records.findAll({
      include: {
        model: students,
        as: "student",
        attributes: ["id", "full_name", "class_id"],
      },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin sức khỏe của một học sinh
const getHealthRecordByStudent = async (req, res) => {
  try {
    const studentHealth = await health_records.findOne({
      where: { student_id: req.params.student_id },
      include: {
        model: students,
        as: "student",
        attributes: ["id", "full_name", "class_id"],
      },
    });
    if (!studentHealth)
      return res.status(404).json({ error: "Health record not found" });
    res.json(studentHealth);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm mới hồ sơ sức khỏe
const addHealthRecord = async (req, res) => {
  try {
    const { student_id, height, weight, health_notes } = req.body;
    const newRecord = await health_records.create({
      student_id,
      height,
      weight,
      health_notes,
    });
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin sức khỏe
const updateHealthRecord = async (req, res) => {
  try {
    const { height, weight, health_notes } = req.body;
    const healthRecord = await health_records.findByPk(req.params.id);
    if (!healthRecord)
      return res.status(404).json({ error: "Health record not found" });

    await healthRecord.update({ height, weight, health_notes });
    res.json(healthRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa hồ sơ sức khỏe
const deleteHealthRecord = async (req, res) => {
  try {
    const healthRecord = await health_records.findByPk(req.params.id);
    if (!healthRecord)
      return res.status(404).json({ error: "Health record not found" });

    await healthRecord.destroy();
    res.json({ message: "Health record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllHealthRecords,
  getHealthRecordByStudent,
  addHealthRecord,
  updateHealthRecord,
  deleteHealthRecord,
};
