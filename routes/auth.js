const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();
const SECRET = 'your-secret-key';

router.post('/login', (req, res) => {
  const { email } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err || !user) return res.status(404).json({ error: 'User not found' });

    const token = jwt.sign({ email: user.email, role: user.role }, SECRET, { expiresIn: '2h' });
    res.json({ token, role: user.role });
  });
});

module.exports = router;
