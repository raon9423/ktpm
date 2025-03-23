const { vaccines } = require("../models");

// Lấy danh sách tất cả vaccine
const getAllVaccines = async (req, res) => {
  try {
    const data = await vaccines.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin vaccine theo ID
const getVaccineById = async (req, res) => {
  try {
    const vaccine = await vaccines.findByPk(req.params.id);
    if (!vaccine) return res.status(404).json({ error: "Vaccine not found" });

    res.json(vaccine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tạo vaccine mới
const createVaccine = async (req, res) => {
  try {
    const { name, description, manufacturer } = req.body;
    const newVaccine = await vaccines.create({
      name,
      description,
      manufacturer,
    });

    res.status(201).json(newVaccine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật vaccine
const updateVaccine = async (req, res) => {
  try {
    const vaccineId = req.params.id;
    const updated = await vaccines.update(req.body, {
      where: { id: vaccineId },
    });

    if (!updated[0])
      return res.status(404).json({ error: "Vaccine not found" });

    res.json({ message: "Vaccine updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa vaccine
const deleteVaccine = async (req, res) => {
  try {
    const vaccineId = req.params.id;
    const deleted = await vaccines.destroy({ where: { id: vaccineId } });

    if (!deleted) return res.status(404).json({ error: "Vaccine not found" });

    res.json({ message: "Vaccine deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllVaccines,
  getVaccineById,
  createVaccine,
  updateVaccine,
  deleteVaccine,
};
