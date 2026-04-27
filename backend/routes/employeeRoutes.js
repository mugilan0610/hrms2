const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const { employeeSchema } = require("../validators/employeeValidator");

// Routes
router.use(authMiddleware);

router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.post("/", validateRequest(employeeSchema), employeeController.createEmployee);
router.put("/:id", validateRequest(employeeSchema), employeeController.updateEmployee);
router.patch("/:id/status", employeeController.updateEmployeeStatus);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
