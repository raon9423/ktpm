const express = require("express");
const router = express.Router();
const healthRecordController = require("../controllers/HealthRecordController");

router.get("/", healthRecordController.getAllHealthRecords);
router.get("/:student_id", healthRecordController.getHealthRecordByStudent);
router.post("/", healthRecordController.addHealthRecord);
router.put("/:id", healthRecordController.updateHealthRecord);
router.delete("/:id", healthRecordController.deleteHealthRecord);

module.exports = router;
