const express = require("express");
const router = express.Router();
const vaccineController = require("../controllers/VaccineController");

router.get("/", vaccineController.getAllVaccines);
router.get("/:id", vaccineController.getVaccineById);
router.post("/", vaccineController.createVaccine);
router.put("/:id", vaccineController.updateVaccine);
router.delete("/:id", vaccineController.deleteVaccine);

module.exports = router;
