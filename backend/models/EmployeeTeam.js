const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const EmployeeTeam = sequelize.define("EmployeeTeam", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  employeeId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  teamId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  assignedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "employee_teams",
  timestamps: false
});

module.exports = EmployeeTeam;
