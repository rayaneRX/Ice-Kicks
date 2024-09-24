const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token and get user data
function isAuthenticated(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.user = decoded; // Attach the decoded user info to the request object
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports = isAuthenticated;
