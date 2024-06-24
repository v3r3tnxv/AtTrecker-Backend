// routes/groups.js

const express = require("express");
const pool = require("../db");
const router = express.Router();

// GET all groups
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Groups");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new group
router.post("/", async (req, res) => {
  const { group_name } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Groups (group_name) VALUES ($1) RETURNING *",
      [group_name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
