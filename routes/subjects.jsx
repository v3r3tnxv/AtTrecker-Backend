// routes/subjects.js

const express = require("express");
const pool = require("../db");
const router = express.Router();

// GET all subjects
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM subjects");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new subject
router.post("/", async (req, res) => {
  const { subject_name } = req.body;
  try {
    const result = await pool.query("INSERT INTO subjects (subject_name) VALUES ($1) RETURNING *", [
      subject_name,
    ]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
