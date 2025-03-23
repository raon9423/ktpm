const { teacher_class, users, classes } = require("../models");

const getTeacherClasses = async (req, res) => {
  try {
    const data = await teacher_class.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const assignTeacherToClass = async (req, res) => {
  try {
    await teacher_class.create(req.body);
    res.status(201).json({ message: "Teacher assigned successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeTeacherFromClass = async (req, res) => {
  try {
    await teacher_class.destroy({ where: req.body });
    res.json({ message: "Teacher removed from class" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTeacherClasses,
  assignTeacherToClass,
  removeTeacherFromClass,
};
