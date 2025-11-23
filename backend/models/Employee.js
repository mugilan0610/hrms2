const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Employee = sequelize.define(
  "Employee",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    organisationId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    teamId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true }, // for assigning to a team
    firstName: { type: DataTypes.STRING(100), allowNull: false },
    lastName: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    phone: { type: DataTypes.STRING(50), allowNull: true }
  },
  {
    tableName: "employees",
    timestamps: true
  }
);

module.exports = Employee;
