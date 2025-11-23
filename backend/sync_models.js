const { sequelize } = require("./models");
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log(" All models synced to the database (hrms2db).");
    process.exit(0);
  } catch (err) {
    console.error(" Sync failed:", err);
    process.exit(1);
  }
})();
