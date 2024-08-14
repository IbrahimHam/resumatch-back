const Recruiter = require('../models/Recruiter');
const Company = require('../models/Company');
const Job = require('../models/Job');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/auth');
const ValidationError = require('../errors/ValidationError');
const DatabaseError = require('../errors/DatabaseError');
const NotFoundError = require('../errors/NotFoundError');

// Register a new recruiter
exports.registerRecruiter = async (req, res, next) => {
  const { email, fullName, password } = req.body;

  try {
    // Check if recruiter already exists
    let recruiter = await Recruiter.findOne({ email });
    if (recruiter) {
      return next(new ValidationError('Recruiter already exists'));
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new recruiter
    recruiter = new Recruiter({
      email,
      fullName,
      passwordHash: hashedPassword,
    });

    await recruiter.save();

    // Generate JWT token
    const token = generateToken({ id: recruiter._id });

    res.status(201).json({
      token,
      recruiter: {
        id: recruiter._id,
        email: recruiter.email,
        fullName: recruiter.fullName,
      },
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

// Log in a recruiter
exports.loginRecruiter = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Get recruiter
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return next(new ValidationError('Invalid credentials'));
    }

    // Check password
    const isMatch = await bcrypt.compare(password, recruiter.passwordHash);
    if (!isMatch) {
      return next(new ValidationError('Invalid credentials'));
    }

    // Generate JWT token
    const token = generateToken({ id: recruiter._id });

    res.status(200).json({
      token,
      recruiter: {
        id: recruiter._id,
        email: recruiter.email,
        fullName: recruiter.fullName,
      },
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

// Create a new company
exports.createCompany = async (req, res, next) => {
  const { name, description, image, location, website, employeesNumber } = req.body;
  const { recruiterId } = req.user;

  try {
    const company = new Company({
      name,
      description,
      image,
      location,
      website,
      employeesNumber,
    });

    await company.save();

    // update recruiter
    await Recruiter.findByIdAndUpdate(recruiterId, { companyId: company._id });

    res.status(201).json(company);
  } catch (error) {
    next(new DatabaseError());
  }
};

// Post a new job
exports.createJob = async (req, res, next) => {
  const { title, description, requirements, jobType, location, tags } = req.body;
  const { recruiterId } = req.user;

  try {
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter || !recruiter.companyId) {
      return next(new ValidationError('Recruiter does not have a company'));
    }

    // Create new job
    const job = new Job({
      title,
      description,
      requirements,
      jobType,
      location,
      tags,
      companyId: recruiter.companyId,
    });

    await job.save();

    // update recruiter's posted jobs
    await Recruiter.findByIdAndUpdate(recruiterId, { $push: { postedJobs: job._id } });

    res.status(201).json(job);
  } catch (error) {
    next(new DatabaseError());
  }
};


// Get posted jobs
exports.getPostedJobs = async (req, res, next) => {
};
