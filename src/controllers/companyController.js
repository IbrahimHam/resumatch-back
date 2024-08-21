const Company = require('../models/Company');
const Recruiter = require('../models/Recruiter');
const Job = require('../models/Job');
const ValidationError = require('../errors/ValidationError');
const DatabaseError = require('../errors/DatabaseError');
const AuthorizationError = require('../errors/AuthorizationError');

// Create a new company
exports.createCompany = async (req, res, next) => {
  const { name, description, location, website, employeesNumber } = req.body;
  const recruiterId = req.user._id;

  if (!name || !description || !location || !employeesNumber) {
    return next(new ValidationError('Required fields are missing.'));
  }

  try {
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return next(new AuthorizationError('You must be a recruiter to create a company.'));
    }

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const company = new Company({
      name,
      description,
      image,
      location,
      website,
      employeesNumber
    });

    await company.save();

    await Recruiter.findByIdAndUpdate(recruiterId, { companyId: company._id });

    res.status(201).json({
      status: 'success',
      data: company
    });

  } catch (error) {
    next(new DatabaseError());
  }
};

// Get all companies
exports.getCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find();

    res.status(200).json({
      status: 'success',
      data: {
        companies
      }
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

// Get a company by ID
exports.getCompany = async (req, res, next) => {
  const { id } = req.params;

  try {
    const company = await Company.findById(id);

    if (!company) {
      return next(new NotFoundError('Company'));
    }

    res.status(200).json({
      status: 'success',
      data: {
        company
      }
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

// Get all jobs posted by a company
exports.getCompanyJobs = async (req, res, next) => {
  const { id } = req.params;

  try {
    const company = await Company.findById(id);
    if (!company) {
      return next(new NotFoundError('Company not found'));
    }
 
    const jobs = await Job.find({ id }).populate('companyId', 'name location');

    res.status(200).json({
      status: 'success',
      data: {
        jobs
      }
    });
  } catch (error) {
    next(new DatabaseError());
  }
};
