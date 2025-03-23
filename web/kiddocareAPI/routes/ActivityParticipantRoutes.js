const express = require("express");
const router = express.Router();
const activityParticipantController = require("../controllers/ActivityParticipantController");

// 📌 Định nghĩa các route
router.get("/", activityParticipantController.getActivityParticipants);
router.get("/:id", activityParticipantController.getActivityParticipantById);
router.post("/", activityParticipantController.createActivityParticipant);
router.put("/:id", activityParticipantController.updateActivityParticipant);
router.delete("/:id", activityParticipantController.deleteActivityParticipant);

module.exports = router;
