const jwt = require('jsonwebtoken');
module.exports = function authenticateToken(req, res, next) {
  // ambil header Authorization: Bearer <token>
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // simpan data user di req.user untuk dipakai di route
    req.user = { id: payload.id };
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or Expired Token' });
  }
};
