const Team = require("../models/Team");
const Employee = require("../models/Employee");
const Log = require("../models/Log"); // Import Log model

// Create a new team
exports.createTeam = async (req, res) => {
  try {
    const { name, organisationId } = req.body;

    if (!name || !organisationId) {
      return res.status(400).json({ error: "Name and organisationId are required" });
    }

    const team = await Team.create({ name, organisationId });

    // Optional: log team creation
    await Log.create({
      organisationId,
      userId: req.user?.id || null, // replace with actual logged-in user
      action: "create_team",
      meta: { teamId: team.id, name }
    });

    res.status(201).json({ message: "Team created", team });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Assign employees to a team
exports.assignEmployees = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { employeeIds } = req.body;

    if (!employeeIds || !Array.isArray(employeeIds)) {
      return res.status(400).json({ error: "employeeIds must be an array" });
    }

    const team = await Team.findByPk(teamId);
    if (!team) return res.status(404).json({ error: "Team not found" });

    // Update employees with the teamId
    await Employee.update(
      { teamId: team.id },
      { where: { id: employeeIds } }
    );

    // Log the assignment action
    await Log.create({
      organisationId: team.organisationId,
      userId: req.user?.id || null,
      action: "assign_employees_to_team",
      meta: { teamId, employeeIds }
    });

    res.json({ message: `Employees assigned to team ${team.name}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Unassign employees from a team
exports.unassignEmployees = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { employeeIds } = req.body;

    if (!employeeIds || !Array.isArray(employeeIds)) {
      return res.status(400).json({ error: "employeeIds must be an array" });
    }

    const team = await Team.findByPk(teamId);
    if (!team) return res.status(404).json({ error: "Team not found" });

    // Remove team assignment
    await Employee.update(
      { teamId: null },
      { where: { id: employeeIds, teamId } }
    );

    // Log unassignment
    await Log.create({
      organisationId: team.organisationId,
      userId: req.user?.id || null,
      action: "unassign_employees_from_team",
      meta: { teamId, employeeIds }
    });

    res.json({ message: `Employees unassigned from team ${team.name}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all teams
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.findAll();
    // For SQLite member counts, fetch employees and map them
    // Alternatively just use an include
    const teamsWithCount = await Promise.all(teams.map(async (team) => {
      const count = await Employee.count({ where: { teamId: team.id } });
      return { ...team.toJSON(), memberCount: count };
    }));
    res.json(teamsWithCount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a team
exports.updateTeam = async (req, res) => {
  try {
    const { name, department, manager } = req.body;
    const team = await Team.findByPk(req.params.id);
    if (!team) return res.status(404).json({ error: "Team not found" });

    await team.update({ name, department, manager });
    res.json({ message: "Team updated", team });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a team
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    
    await team.destroy();
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all employees of a specific team
exports.getTeamEmployees = async (req, res) => {
  try {
    const { teamId } = req.params;

    const team = await Team.findByPk(teamId);
    if (!team) return res.status(404).json({ error: "Team not found" });

    const employees = await Employee.findAll({
      where: { teamId: teamId }
    });

    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
