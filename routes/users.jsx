// routes/users.js

const express = require("express");
const pool = require("../db");
const router = express.Router();

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

module.exports = router;
