const express = require("express");
const router = express.Router();
const studentController = require("../controllers/StudentController");

// tim kiem theo ten An sửa dòng nàynày
router.get("/search", studentController.searchStudentsByName); // Tìm kiếm học sinh theo tên

// Định nghĩa các route cho student
router.get("/", studentController.getStudents); // Lấy danh sách học sinh
router.get("/:id", studentController.getStudentById); // Lấy thông tin 1 học sinh
router.post("/", studentController.createStudent); // Thêm học sinh mới
router.put("/:id", studentController.updateStudent); // Cập nhật thông tin học sinh
router.delete("/:id", studentController.deleteStudent); // Xóa học sinh


module.exports = router;
