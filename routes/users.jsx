// routes/users.js

const express = require("express");
const pool = require("../db");
const router = express.Router();

// GET all users with roles
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT users.user_id, users.user_login, users.user_password, roles.role_name
      FROM users
      JOIN roles ON users.role_id = roles.role_id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new user
router.post("/", async (req, res) => {
  const { user_login, user_password, role_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (user_login, user_password, role_id) VALUES ($1, $2, $3) RETURNING *",
      [user_login, user_password, role_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE users
router.delete("/", async (req, res) => {
  const { ids } = req.body;
  try {
    const result = await pool.query("DELETE FROM users WHERE user_id = ANY($1) RETURNING *", [ids]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
