const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  organisationId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING(255), allowNull: false },
  name: { type: DataTypes.STRING(255) }
}, {
  tableName: "users",
  timestamps: true
});

module.exports = User;
