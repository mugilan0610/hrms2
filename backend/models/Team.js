const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Employee = require("./Employee"); // Import Employee model for association

// Define Team model
const Team = sequelize.define(
  "Team",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    organisationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "teams",
    timestamps: true,
  }
);

// Many-to-many association with Employee
Team.belongsToMany(Employee, {
  through: "TeamEmployees", // join table
  as: "employees",
  foreignKey: "teamId",
  otherKey: "employeeId",
});

Employee.belongsToMany(Team, {
  through: "TeamEmployees",
  as: "teams",
  foreignKey: "employeeId",
  otherKey: "teamId",
});

module.exports = Team;
