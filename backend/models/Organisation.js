const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Organisation = sequelize.define("Organisation", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(255), allowNull: false }
}, {
  tableName: "organisations",
  timestamps: true
});

module.exports = Organisation;
