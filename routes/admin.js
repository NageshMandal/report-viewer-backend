const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/add-user', auth('admin'), (req, res) => {
  const { email, role } = req.body;
  if (!email || !['viewer', 'reviewer'].includes(role)) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  db.run('INSERT INTO users (email, role) VALUES (?, ?)', [email, role], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: this.lastID });
  });
});

module.exports = router;
