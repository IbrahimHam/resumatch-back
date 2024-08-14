const User = require('../models/User');
const Job = require('../models/Job');
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

// Should be tested
exports.applyJob = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    const job = await Job.findById(id);
    if (!job) {
      return next(new NotFoundError('Job not found'));
    }

    user.appliedJobs.push(job);
    await user.save();

    res.status(200).json({ message: "Applied to job successfully" });
  } catch (error) {
    next(new DatabaseError());
  }
}

// Should be tested
exports.getAppliedJobs = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    .populate('appliedJobs');
    if (!user) {
      return next(new NotFoundError('User not found'));
    }
    res.status(200).json(user.appliedJobs);
  } catch (error) {
    next(new DatabaseError());
  }
};

// Should be tested
exports.getJobs = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('resume');
    if (!user || !user.resume) {
      return next(new NotFoundError('User or resume data found'));
    }

    const skills = user.resume.skills;
    const jobTitles = user.resume.experience.map(exp => exp.jobTitle);
   
    const { location, jobType, industry } = user.preferences;

    const jobQuery = {
      $or: [
        { title: { $in: jobTitles } },
        { 'requirements.skill': { $in: skills } },
        { description: { $regex: skills.join('|'), $options: 'i' } }
      ]
    };

    if (location) jobQuery.location = location;
    if (jobType) jobQuery.jobType = jobType;
    if (industry) jobQuery.tags = industry;

    // Score jobs based on user preferences
    const jobs = await Job.find(jobQuery);
    const scoredJobs = jobs.map(job => {
      let score = 0;
      // Job title matches
      if (jobTitles.some(title => job.title.toLowerCase().includes(title.toLowerCase()))) {
        score += 3;
      }
      // Skill matches
      job.requirements.forEach(req => {
        if (skills.includes(req.skill)) {
          score += 1;
        }
      });
      // Location, job type and industry matches
      if (job.location === location) score += 1;
      if (job.jobType === jobType) score += 1;
      if (job.tags.includes(industry)) score += 1;

      return { job, score };
    });

    // Sort jobs by score
    scoredJobs.sort((a, b) => b.score - a.score);

    // Return only jobs
    const matchedJobs = scoredJobs.map(({ job }) => job);

    res.json(matchedJobs);
  } catch (error) {
    next(new DatabaseError());
  }
};