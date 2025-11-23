const sequelize = require("../config/db");
const Organisation = require("./Organisation");
const User = require("./User");
const Employee = require("./Employee");
const Team = require("./Team");
const EmployeeTeam = require("./EmployeeTeam");
const Log = require("./Log");

// Associations
Organisation.hasMany(User, { foreignKey: "organisationId", onDelete: "CASCADE" });
User.belongsTo(Organisation, { foreignKey: "organisationId" });

Organisation.hasMany(Employee, { foreignKey: "organisationId", onDelete: "CASCADE" });
Employee.belongsTo(Organisation, { foreignKey: "organisationId" });

Organisation.hasMany(Team, { foreignKey: "organisationId", onDelete: "CASCADE" });
Team.belongsTo(Organisation, { foreignKey: "organisationId" });

Employee.belongsToMany(Team, { through: EmployeeTeam, foreignKey: "employeeId", otherKey: "teamId" });
Team.belongsToMany(Employee, { through: EmployeeTeam, foreignKey: "teamId", otherKey: "employeeId" });

Organisation.hasMany(Log, { foreignKey: "organisationId" });
Log.belongsTo(Organisation, { foreignKey: "organisationId" });

User.hasMany(Log, { foreignKey: "userId" });
Log.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  sequelize,
  Organisation,
  User,
  Employee,
  Team,
  EmployeeTeam,
  Log
};
