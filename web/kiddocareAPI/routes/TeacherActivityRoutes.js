const express = require("express");
const router = express.Router();
const teacherActivityController = require("../controllers/TeacherActivityController");

router.get("/", teacherActivityController.getAllTeacherActivities);
router.get("/:id", teacherActivityController.getTeacherActivityById);
router.post("/", teacherActivityController.createTeacherActivity);
router.put("/:id", teacherActivityController.updateTeacherActivity);
router.delete("/:id", teacherActivityController.deleteTeacherActivity);

module.exports = router;
