const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // make sure path is correct

// Test route
router.get("/", (req, res) => {
  res.json({ message: "Auth route working!" });
});

// User registration
router.post("/register", authController.register);

// User login
router.post("/login", authController.login);

module.exports = router;
