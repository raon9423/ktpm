const express = require("express");
const router = express.Router();
const teacherClassController = require("../controllers/TeacherClassController");

router.get("/", teacherClassController.getTeacherClasses);
router.post("/", teacherClassController.assignTeacherToClass);
router.delete("/", teacherClassController.removeTeacherFromClass);

module.exports = router;