// routes/statuses.js

const express = require("express");
const pool = require("../db");
const router = express.Router();

// GET all statuses
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Statuses");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new status
router.post("/", async (req, res) => {
  const { status_name, status_short_name } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Statuses (status_name, status_short_name) VALUES ($1, $2) RETURNING *",
      [status_name, status_short_name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
