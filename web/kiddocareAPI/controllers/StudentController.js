const { students, users, classes ,class_students } = require("../models");
const { body, validationResult } = require("express-validator");
const upload = require("../config/multerConfig");
console.log('Upload imported:', upload); // Log để kiểm tra upload
const path = require('path'); // Đảm bảo dòng này có mặt
const fs = require('node:fs/promises');
const { Op } = require('sequelize');
// Middleware validate student input
const validateStudent = [
  body("full_name").notEmpty().withMessage("Full name is required"),
  body("date_of_birth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Invalid date format (YYYY-MM-DD)"),
  body("parent_id")
    .optional()
    .isInt()
    .withMessage("Parent ID must be a number"),
  body("class_id").optional().isInt().withMessage("Class ID must be a number"),
];

// Lấy danh sách sinh viên
const getStudents = async (req, res) => {
  try {
    const studentList = await students.findAll({
      include: [
        {
          model: users,
          as: "parent",
          attributes: ["id", "full_name", "email"],
        },

        { model: classes, 
          as: "classes", 
          attributes: ["id", "name"] },
      ],
    });
    res.json(studentList);
  } catch (error) {
    console.error("Error fetching students:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Lấy thông tin một sinh viên theo ID
const getStudentById = async (req, res) => {
  try {
    const student = await students.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: users,
          as: "parent",
          attributes: ["id", "full_name", "email", "phone_number" ,"address"],
        },
        { model: classes, as: "classes", attributes: ["id", "name"] },
      ],
    });

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Thêm mới sinh viên với hình ảnh
const createStudent = [
  upload('students').single('image'), // Sử dụng multer để upload hình ảnh
  validateStudent,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Chuẩn bị dữ liệu sinh viên
      const studentData = {
        ...req.body,
        image: req.existingFilePath || (req.file ? `/uploads/students/${req.file.filename}` : null)
      };

      // Thêm sinh viên vào bảng students
      const newStudent = await students.create(studentData);

      // Kiểm tra nếu có class_id, thêm vào bảng class_students
      if (req.body.class_id) {
        await class_students.create({
          class_id: req.body.class_id,
          student_id: newStudent.id
        });
      }

      // Trả về dữ liệu sinh viên đã thêm
      res.status(201).json(newStudent);
    } catch (error) {
      console.error("Error creating student:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }
];

// Cập nhật thông tin sinh viên
const updateStudent = [
  upload('students').single('image'),
  validateStudent,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const student = await students.findByPk(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      const updatedData = {
        full_name: req.body.full_name,
        date_of_birth: req.body.date_of_birth,
        gender: req.body.gender,
        class_id: req.body.class_id ? parseInt(req.body.class_id) : student.class_id,
        parent_id: req.body.parent_id ? parseInt(req.body.parent_id) : student.parent_id,
        image: req.file ? `/uploads/students/${req.file.filename}` : student.image
      };

      // Xóa ảnh cũ nếu có ảnh mới
      if (req.file && student.image && student.image !== updatedData.image) {
        const oldImagePath = path.join(__dirname, '..', student.image);
        await fs.unlink(oldImagePath).catch(err => console.error('Error deleting old image:', err));
      }

      await student.update(updatedData);
      res.json(student);
    } catch (error) {
      console.error("Error updating student:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }
];
// Xóa sinh viên
const deleteStudent = async (req, res) => {
  try {
    const student = await students.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    await student.destroy();
    res.status(204).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Tìm kiếm học sinh theo tên
const searchStudentsByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: "Name query parameter is required" });
    }

    const foundStudents = await students.findAll({
      where: {
        full_name: {
          [Op.like]: `%${name}%`
          // Nếu dùng MySQL: [Op.like]: `%${name}%`
        }
      },
      include: [
        {
          model: users,
          as: "parent",
          attributes: ["id", "full_name", "email"],
        },

        { model: classes, 
          as: "classes", 
          attributes: ["id", "name"] },
      ],
    });

    // Trả về mảng rỗng nếu không tìm thấy, thay vì lỗi
    res.status(200).json(foundStudents.length > 0 ? foundStudents : []);
  } catch (error) {
    console.error('Error searching students:', error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  searchStudentsByName
};
