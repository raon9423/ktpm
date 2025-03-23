const express = require("express");
const router = express.Router();
const classStudentController = require("../controllers/ClassStudentController");

router.get("/", classStudentController.getAllClassStudents);
router.get("/class/:class_id", classStudentController.getStudentsByClass);
router.get("/student/:student_id", classStudentController.getClassesByStudent);
router.post("/", classStudentController.addClassStudent);
router.delete("/:class_id/:student_id", classStudentController.removeClassStudent);

module.exports = router;