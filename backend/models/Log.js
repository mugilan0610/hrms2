const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Log model for audit trail / tracking actions in HRMS
const Log = sequelize.define("Log", {
  id: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    autoIncrement: true, 
    primaryKey: true 
  },
  organisationId: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    allowNull: false 
  }, // Organisation performing the action
  userId: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    allowNull: false 
  }, // User performing the action
  action: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  }, // Name of the action performed
  meta: { 
    type: DataTypes.JSON, 
    allowNull: true 
  } // Optional metadata like employeeId, teamId, etc.
}, {
  tableName: "logs",
  timestamps: true // Sequelize will create `createdAt` and `updatedAt`
});

module.exports = Log;
