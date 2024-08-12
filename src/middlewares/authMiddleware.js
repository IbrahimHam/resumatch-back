const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Recruiter = require('../models/Recruiter');
const AppError = require('../errors/AppError');
const ValidationError = require('../errors/ValidationError');

// Fetch secret key from environment variables
const secret = process.env.SECRET_KEY;

// Middleware to authenticate and attach user to request
async function authMiddleware(req, res, next) {
  // Get token from Authorization header
  const token = req.headers.authorization?.split(' ')[1]; // Authorization: Bearer <token>

  // Check if token exists
  if (!token) {
    return next(new ValidationError('No token provided'));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, secret);

    // Determine the type of user and fetch the corresponding model
    let user = await User.findById(decoded.id);
    if (!user) {
      user = await Recruiter.findById(decoded.id);
    }

    if (!user) {
      return next(new AppError('User not found', 401));
    }

    // Attach user information to request
    req.user = user;

    next();
  } catch (error) {
    // Handle invalid or expired token
    next(new ValidationError('Invalid or expired token'));
  }
}

module.exports = authMiddleware;
