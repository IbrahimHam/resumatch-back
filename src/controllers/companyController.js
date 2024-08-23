const Company = require('../models/Company');
const Recruiter = require('../models/Recruiter');
const Job = require('../models/Job');
const ValidationError = require('../errors/ValidationError');
const DatabaseError = require('../errors/DatabaseError');
const AuthorizationError = require('../errors/AuthorizationError');

// Create a new company
exports.createCompany = async (req, res, next) => {
  const { name, description, location, website, employeesNumber, companyEmail } = req.body;
  const recruiterId = req.user._id;

  if (!name || !description || !location || !employeesNumber || !companyEmail) {
    return next(new ValidationError('Required fields are missing.'));
  }

  try {
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return next(new AuthorizationError('You must be a recruiter to create a company.'));
    }

    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res.status(409).json({
        status: 'fail',
        message: 'Company with this name already exists. Please connect to the existing company.',
        data: existingCompany
      });
    }

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const company = new Company({
      name,
      description,
      image,
      location,
      website,
      employeesNumber,
      companyEmail,
    });

    await company.save();

    await Recruiter.findByIdAndUpdate(recruiterId, { companyId: company._id });

    res.status(201).json({
      status: 'success',
      data: company
    });

  } catch (error) {
    if (error.code === 11000) {
      return next(new ValidationError('Company with this name already exists.'));
    }
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

    const jobs = await Job.find({ "companyId": id }).populate('companyId', 'name location');

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

// Search companies by name
exports.searchCompanies = async (req, res, next) => {
  const { query } = req.query;

  try {
    const companies = await Company.find({
      name: { $regex: query, $options: 'i' }
    });

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

// Recruiter joins an existing company
exports.joinCompany = async (req, res, next) => {
  const { companyId } = req.body;
  const recruiterId = req.user._id;

  if (!companyId) {
    return next(new ValidationError('Company ID is required.'));
  }

  try {
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return next(new AuthorizationError('You must be a recruiter to join a company.'));
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return next(new ValidationError('Company not found.'));
    }

    recruiter.companyId = companyId;
    await recruiter.save();

    res.status(200).json({
      status: 'success',
      message: 'Joined company successfully',
      data: {
        recruiter
      }
    });
  } catch (error) {
    next(new DatabaseError());
  }
};
