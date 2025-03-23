const express = require("express");
const router = express.Router();
const classActivityController = require("../controllers/ClassActivityController");

router.get("/", classActivityController.getAllClassActivities);
router.get("/class/:class_id", classActivityController.getActivitiesByClass);
router.get("/activity/:activity_id", classActivityController.getClassesByActivity);
router.post("/", classActivityController.addClassActivity);
router.delete("/:class_id/:activity_id", classActivityController.removeClassActivity);

module.exports = router;
