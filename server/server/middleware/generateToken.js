const jwt = require('jsonwebtoken');

async function generateToken(user) {
    return jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET , { expiresIn: '2h' });
  }

module.exports = generateToken