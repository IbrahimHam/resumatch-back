const User = require('../models/User');
const Job = require('../models/Job');
const Resume = require('../models/Resume');
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

exports.getUser = async (req, res, next) => {
   try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

// Should be tested
exports.createResumeData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('resume');
    
    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    let resume;

    if (!user.resume) {
      const resumeData = {
        user: user._id,
        ...req.body
      };

      resume = new Resume(resumeData);
      await resume.save();

      user.resume = resume._id;
      await user.save();
    } else {
      resume = user.resume;
      Object.assign(resume, req.body);
      await resume.save();
    }

    res.status(201).json({
      status: 'success',
      data: {
        resume
      }
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

exports.getResumeData = async (req, res, next) => {
  try {
    const resume = await Resume.find({ user: req.user._id });
    if (!resume) {
      return next(new NotFoundError('User or resume data not found'));
    }
    res.status(200).json({
      status: 'success',
      data: {
        resume
      }
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

exports.updateResumeData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('resume');
    
    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    if (!user.resume) {
      return next(new NotFoundError('You do not have a resume data'));
    }

    const resume = user.resume;
    Object.assign(resume, req.body);
    await resume.save();

    res.status(200).json({
      status: 'success',
      data: {
        resume
      }
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

// Should be tested
exports.getTemplates = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError('User not found'));
    }
    res.status(200).json(user.templates);
  } catch (error) {
    next(new DatabaseError());
  }
};

// Should be tested
exports.getTemplate = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError('User not found'));
    }
    res.status(200).json(user.templates.id(id));
  }
  catch (error) {
    next(new DatabaseError());
  }
};

exports.uploadResume = async (req, res, next) => {};