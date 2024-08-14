const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/auth');
const ValidationError = require('../errors/ValidationError');
const DatabaseError = require('../errors/DatabaseError');
const NotFoundError = require('../errors/NotFoundError');
const { hashPassword, comparePassword } = require('../utils/password');

// Register a new user
exports.register = async (req, res, next) => {
  const { email, fullName, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return next(new ValidationError('User already exists'));
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    user = new User({
      email,
      fullName,
      passwordHash: hashedPassword,
    });

    await user.save();

    // Generate JWT token
    const token = generateToken({ id: user._id });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

// Log in a user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Get user
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ValidationError('Invalid credentials'));
    }

    // Check password
    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return next(new ValidationError('Invalid credentials'));
    }

    // Generate JWT token
    const token = generateToken({ id: user._id });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    next(new DatabaseError());
  }
};
