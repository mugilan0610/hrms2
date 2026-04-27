const Employee = require("../models/Employee");

// GET all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE employee
exports.createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, organisationId, teamId, role, active } = req.body;
    const employee = await Employee.create({ 
      firstName, lastName, email, organisationId, teamId, 
      role: role || 'Employee', 
      active: active !== undefined ? active : true 
    });
    res.json({ message: "Employee created successfully", employee });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE employee
exports.updateEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, teamId, role, active } = req.body;
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });

    await employee.update({ 
      firstName, lastName, email, teamId, role, 
      active: active !== undefined ? active : employee.active 
    });
    res.json({ message: "Employee updated", employee });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PATCH employee status
exports.updateEmployeeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });

    const isActive = status === 'Active';
    await employee.update({ active: isActive });
    res.json({ message: "Employee status updated", employee });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });

    await employee.destroy();
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
