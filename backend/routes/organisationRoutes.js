const express = require("express");
const router = express.Router();
const Organisation = require("../models/Organisation");

// Create a new organisation
router.post("/create", async (req, res) => {
    try {
        const { name } = req.body;
        const org = await Organisation.create({ name });
        res.json({ message: "Organization created", org });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
