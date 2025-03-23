const { student_vaccines, students, vaccines } = require("../models");

// Lấy danh sách tất cả lần tiêm phòng
const getAllStudentVaccines = async (req, res) => {
  try {
    const data = await student_vaccines.findAll({
      include: [
        { model: students, as: "student", attributes: ["id", "full_name"] },
        { model: vaccines, as: "vaccine", attributes: ["id", "name","description"] },
      ],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin tiêm phòng theo ID
const getStudentVaccineById = async (req, res) => {
  try {
    const record = await student_vaccines.findByPk(req.params.id, {
      include: [
        { model: students, as: "student", attributes: ["id", "full_name"] },
        { model: vaccines, as: "vaccine", attributes: ["id", "name", "description"] },
      ],
    });

    if (!record) return res.status(404).json({ error: "Record not found" });

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ghi nhận lần tiêm mới
const createStudentVaccine = async (req, res) => {
  try {
    const { student_id, vaccine_id, vaccination_date, status } = req.body;
    const newRecord = await student_vaccines.create({
      student_id,
      vaccine_id,
      vaccination_date,
      status,
    });

    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin tiêm phòng
const updateStudentVaccine = async (req, res) => {
  try {
    const recordId = req.params.id;
    const updated = await student_vaccines.update(req.body, {
      where: { id: recordId },
    });

    if (!updated[0]) return res.status(404).json({ error: "Record not found" });

    res.json({ message: "Record updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa thông tin tiêm phòng
const deleteStudentVaccine = async (req, res) => {
  try {
    const recordId = req.params.id;
    const deleted = await student_vaccines.destroy({ where: { id: recordId } });

    if (!deleted) return res.status(404).json({ error: "Record not found" });

    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllStudentVaccines,
  getStudentVaccineById,
  createStudentVaccine,
  updateStudentVaccine,
  deleteStudentVaccine,
};
