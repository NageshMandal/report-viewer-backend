const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth('viewer'), (req, res) => {
  const { reportId, userComment, flaggedSection } = req.body;
  db.run(
    'INSERT INTO feedback (reportId, userComment, flaggedSection) VALUES (?, ?, ?)',
    [reportId, userComment, flaggedSection],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// routes/feedback.js

router.get('/', auth('reviewer'), (req, res) => {
  const { reportId } = req.query;

  db.all(
    'SELECT * FROM feedback WHERE reportId = ?',
    [reportId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});


module.exports = router;
