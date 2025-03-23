const express = require("express");
const router = express.Router();
const extracurricularActivityController = require("../controllers/ExtracurricularActivityController");

router.get("/", extracurricularActivityController.getAllActivities);
router.get("/:id", extracurricularActivityController.getActivityById);
router.post("/", extracurricularActivityController.addActivity);
router.put("/:id", extracurricularActivityController.updateActivity);
router.delete("/:id", extracurricularActivityController.deleteActivity);

module.exports = router;
