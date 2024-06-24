// routes/students.js

const express = require("express");
const pool = require("../db");
const router = express.Router();

// GET all students
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Students");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new student
router.post("/", async (req, res) => {
  const { student_surname, student_name, student_patronymic } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Students (student_surname, student_name, student_patronymic) VALUES ($1, $2, $3) RETURNING *",
      [student_surname, student_name, student_patronymic]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE students
router.delete("/", async (req, res) => {
  const { ids } = req.body;
  try {
    const result = await pool.query("DELETE FROM Students WHERE student_id = ANY($1) RETURNING *", [
      ids,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
