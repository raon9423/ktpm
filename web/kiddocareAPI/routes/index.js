const express = require("express");
const router = express.Router();

// Import tất cả các route
const activityRoutes = require("./ActivityRoutes");
const userRoutes = require("./UserRoute");
const studentRoutes = require("./StudentRoutes");
const activityParticipantRoutes = require("./ActivityParticipantRoutes");
const assessmentsRoutes = require("./AssessmentsRoutes");
const attendanceRoutes = require("./AttendanceRoutes");
const classRoutes = require("./ClassRoutes");
const classActivityRoutes = require("./ClassActivityRoutes");
const classStudentRoutes = require("./ClassStudentRoutes");
const extracurricularActivityRoutes = require("./ExtracurricularActivityRoutes");
const feedbackRoutes = require("./FeedBackRoutes");
const healthRecordRoutes = require("./HealthRecordRoutes");
const notificationRoutes = require("./NotificationRoutes");
const scheduleRoutes = require("./ScheduleRoutes");
const vaccineRoutes = require("./VaccineRoutes");
const studentVaccineRoutes = require("./StudentVaccineRoutes");
const teacherActivityRoutes = require("./TeacherActivityRoutes");
const chatRoomRoutes = require("./ChatRoomRoutes");
const chatRoomUserRoutes = require("./ChatRoomUserRoutes");
const messageRoutes = require("./MessageRoutes");
const messageStatusRoutes = require("./MessageStatusRoutes");
const authRoutes = require("./AuthRoutes")

router.use("/activities", activityRoutes);
router.use("/users", userRoutes);
router.use("/students", studentRoutes);
router.use("/activity-participants", activityParticipantRoutes);
router.use("/assessments", assessmentsRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/classes", classRoutes);
router.use("/class-activities", classActivityRoutes);
router.use("/class-students", classStudentRoutes);
router.use("/extracurricular-activities", extracurricularActivityRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/health-records", healthRecordRoutes);
router.use("/notifications", notificationRoutes);
router.use("/schedules", scheduleRoutes);
router.use("/vacines", vaccineRoutes);
router.use("/student-vaccines", studentVaccineRoutes);
router.use("/teacher-activities", teacherActivityRoutes);
router.use("/chat-rooms", chatRoomRoutes);
router.use("/chat-room-users", chatRoomUserRoutes);
router.use("/messages", messageRoutes);
router.use("/message-status", messageStatusRoutes);
router.use("/auth", authRoutes)
module.exports = router;

