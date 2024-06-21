// routes/subgroups.js

const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT subgroups.subgroup_id, subgroups.subgroup_name, groups.group_name
      FROM subgroups
      JOIN groups ON subgroups.group_id = groups.group_id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
