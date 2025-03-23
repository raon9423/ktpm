const { classes, users, teacher_class } = require("../models");

// Lấy danh sách lớp học kèm giáo viên
const getAllClasses = async (req, res) => {
  try {
    const data = await classes.findAll({
      include: [
        {
          model: users,
          as: "teachers",
          attributes: ["id", "full_name", "email"],
          through: { attributes: [] },
        },
      ],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy lớp học theo ID
const getClassById = async (req, res) => {
  try {
    const classData = await classes.findByPk(req.params.id, {
      include: [{ model: users, as: "teachers" }],
    });
    if (!classData) return res.status(404).json({ message: "Class not found" });
    res.json(classData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm lớp học mới
const createClass = async (req, res) => {
  try {
    const newClass = await classes.create(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật lớp học
const updateClass = async (req, res) => {
  try {
    const updated = await classes.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: "Class not found" });
    res.json({ message: "Class updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa lớp học
const deleteClass = async (req, res) => {
  try {
    await classes.destroy({ where: { id: req.params.id } });
    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllClasses, getClassById, createClass, updateClass, deleteClass };
