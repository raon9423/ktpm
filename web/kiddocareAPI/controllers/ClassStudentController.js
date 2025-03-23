const { class_students, classes, students } = require("../models");

// Lấy danh sách tất cả class_students
const getAllClassStudents = async (req, res) => {
  try {
    const data = await class_students.findAll({
      include: [
        { model: classes, as: "class" },
        { model: students, as: "student" },
      ],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách students theo class_id
const getStudentsByClass = async (req, res) => {
  try {
    const data = await class_students.findAll({
      where: { class_id: req.params.class_id },
      include: [{ model: students, as: "student" }],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách classes theo student_id
const getClassesByStudent = async (req, res) => {
  try {
    const data = await class_students.findAll({
      where: { student_id: req.params.student_id },
      include: [{ model: classes, as: "class" }],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm liên kết class - student
const addClassStudent = async (req, res) => {
  try {
    const { class_id, student_id } = req.body;
    const newLink = await class_students.create({ class_id, student_id });
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa liên kết class - student
const removeClassStudent = async (req, res) => {
  try {
    const { class_id, student_id } = req.params;
    await class_students.destroy({ where: { class_id, student_id } });
    res.json({ message: "Class-Student link deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllClassStudents,
  getStudentsByClass,
  getClassesByStudent,
  addClassStudent,
  removeClassStudent,
};
