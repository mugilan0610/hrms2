const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Database Connected Successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to MySQL:", error.message);
  }
})();

sequelize.sync();

module.exports = sequelize;
