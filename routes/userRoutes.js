const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/userController');
const isAuthenticated = require('../middleware/authMiddleware');

// Route to login an existing user
router.post('/login', loginUser);

// Route to get the current user's info
router.get('/current-user', isAuthenticated, (req, res) => {
  res.json({ username: req.user.username });
});

module.exports = router;
