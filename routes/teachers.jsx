// routes/teachers.js

const express = require("express");
const pool = require("../db");
const router = express.Router();

// GET all teachers
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM teachers");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new teacher
router.post("/", async (req, res) => {
  const { teacher_surname, teacher_name, teacher_patronymic } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO teachers (teacher_surname, teacher_name, teacher_patronymic) VALUES ($1, $2, $3) RETURNING *",
      [teacher_surname, teacher_name, teacher_patronymic]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE teachers
router.delete("/", async (req, res) => {
  const { ids } = req.body;
  try {
    const result = await pool.query("DELETE FROM teachers WHERE teacher_id = ANY($1) RETURNING *", [
      ids,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
