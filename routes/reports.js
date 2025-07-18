const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth(), (req, res) => {
  db.all('SELECT * FROM reports', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const reports = rows.map(row => ({
      ...row,
      sources: JSON.parse(row.sources)
    }));
    res.json(reports);
  });
});

module.exports = router;
