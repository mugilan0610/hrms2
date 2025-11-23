require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import DB connection and sync models
const sequelize = require("./config/db");
const User = require("./models/User");
const Organisation = require("./models/Organisation");
const Employee = require("./models/Employee");
const Team = require("./models/Team");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("HRMS backend running successfully!");
});

// Routes
const authRoutes = require("./routes/authRoutes");
const organisationRoutes = require("./routes/organisationRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const teamRoutes = require("./routes/teamRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/organisations", organisationRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/teams", teamRoutes);

// Sync models & start server
sequelize.sync({ alter: true }) // Creates/updates tables based on models
  .then(() => {
    console.log("All tables synced successfully!");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Error syncing tables:", err);
  });
