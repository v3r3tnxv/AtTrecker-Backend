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

router.post("/", async (req, res) => {
  const { subgroup_name, group_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO SubGroups (subgroup_name, group_id) VALUES ($1, $2) RETURNING *",
      [subgroup_name, group_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE subgroups
router.delete("/", async (req, res) => {
  const { ids } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM subgroups WHERE subgroup_id = ANY($1) RETURNING *",
      [ids]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

