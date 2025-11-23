const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

// Test route to check if teams endpoint is working
router.get("/", teamController.getTeams);

// Create a new team
router.post("/", teamController.createTeam);

// Assign employees to a specific team
router.post("/:teamId/assign", teamController.assignEmployees);

// Get all employees of a specific team
router.get("/:teamId/employees", teamController.getTeamEmployees);

router.delete("/:teamId/unassign", teamController.unassignEmployees);


module.exports = router;
