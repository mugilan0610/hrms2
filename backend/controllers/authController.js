const bcrypt = require("bcrypt");         // ✅ import bcrypt
const jwt = require("jsonwebtoken");      // ✅ import jwt
const User = require("../models/User");   // ✅ import your User model

// USER REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, organisationId } = req.body;

    // Hash the password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      passwordHash: hashed,
      organisationId
    });

    res.json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// USER LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Compare password
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(400).json({ error: "Wrong password" });

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
