const express = require("express");
const router = express.Router();
const activityController = require("../controllers/ActivityController");

// Lấy danh sách hoạt động
router.get("/", activityController.getActivities);

// Lấy một hoạt động theo ID
router.get("/:id", activityController.getActivityById);

// Tạo mới hoạt động
router.post("/", activityController.createActivity);

// Cập nhật thông tin hoạt động
router.put("/:id", activityController.updateActivity);

// Xóa hoạt động
router.delete("/:id", activityController.deleteActivity);

module.exports = router;
