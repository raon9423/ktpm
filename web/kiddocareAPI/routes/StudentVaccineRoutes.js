const express = require("express");
const router = express.Router();
const studentVaccineController = require("../controllers/StudentVaccineController");

router.get("/", studentVaccineController.getAllStudentVaccines);
router.get("/:id", studentVaccineController.getStudentVaccineById);
router.post("/", studentVaccineController.createStudentVaccine);
router.put("/:id", studentVaccineController.updateStudentVaccine);
router.delete("/:id", studentVaccineController.deleteStudentVaccine);

module.exports = router;
