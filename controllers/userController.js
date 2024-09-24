const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Login an existing user
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, 'secret_key', { expiresIn: '1h' });

    // Set the token as a cookie
    res.cookie('token', token, { httpOnly: true, secure: false }); // Use secure: true in production with HTTPS
    res.status(200).json({ message: 'Login successful', username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
}

module.exports = { loginUser };