const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/ScheduleController");

router.get("/", scheduleController.getAllSchedules);
router.get("/:class_id", scheduleController.getScheduleByClass);
router.post("/", scheduleController.createSchedule);
router.put("/:id", scheduleController.updateSchedule);
router.delete("/:id", scheduleController.deleteSchedule);

module.exports = router;
