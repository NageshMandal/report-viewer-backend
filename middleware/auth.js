const jwt = require('jsonwebtoken');
const SECRET = 'your-secret-key';

function auth(requiredRole = null) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token required' });

    try {
      const decoded = jwt.verify(token, SECRET);
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      req.user = decoded;
      next();
    } catch {
      return res.status(403).json({ error: 'Invalid token' });
    }
  };
}

module.exports = auth;
