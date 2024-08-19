const Job = require('../models/Job');
const Recruiter = require('../models/Recruiter');
const User = require('../models/User');
const ValidationError = require('../errors/ValidationError');
const DatabaseError = require('../errors/DatabaseError');
const NotFoundError = require('../errors/NotFoundError');
const AuthorizationError = require('../errors/AuthorizationError');

// Create a new job
exports.createJob = async (req, res, next) => {
  const { title, description, requirements, jobType, location, tags } = req.body;
  const recruiterId = req.user._id;

  try {
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter || !recruiter.companyId) {
      return next(new ValidationError('Recruiter does not have a company'));
    }

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
    await Recruiter.findByIdAndUpdate(recruiterId, { $push: { postedJobs: job._id } });

    res.status(201).json(job);
  } catch (error) {
    next(new DatabaseError());
  }
};

// Update a job
exports.updateJob = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;
  const recruiterId = req.user._id;

  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new NotFoundError('Job'));
    }

    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter || recruiter.companyId.toString() !== job.companyId.toString()) {
      return next(new AuthorizationError('You are not authorized to update this job'));
    }

    const updatedJob = await Job.findByIdAndUpdate(id, updates, { new: true }).populate('companyId', 'name location');

    res.status(200).json({
      status: 'success',
      data: {
        job: updatedJob
      }
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

// Delete a job by ID
exports.deleteJob = async (req, res, next) => {
  const { id } = req.params;
  const recruiterId = req.user._id;

  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new NotFoundError('Job'));
    }

    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter || recruiter.companyId.toString() !== job.companyId.toString()) {
      return next(new AuthorizationError('You are not authorized to delete this job'));
    }

    await Job.findByIdAndDelete(id);

    // remove job from recruiter's posted jobs
    await Recruiter.findByIdAndUpdate(recruiterId, { $pull: { postedJobs: id } });

    res.status(204).send({ message: 'Deleted successfully' });
  } catch (error) {
    next(new DatabaseError());
  }
};

// Get all jobs
exports.getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate('companyId', 'name location');

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

// Get a job by ID
exports.getJob = async (req, res, next) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id).populate('companyId', 'name location');
    if (!job) {
      return next(new NotFoundError('Job'));
    }

    res.status(200).json({
      status: 'success',
      data: {
        job
      }
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

// Get all posted jobs for a specific recruiter
exports.getPostedJobs = async (req, res, next) => {
  const recruiterId = req.user._id;

  try {
    const recruiter = await Recruiter.findById(recruiterId).populate('postedJobs');
    if (!recruiter) {
      return next(new NotFoundError('Recruiter not found'));
    }

    res.status(200).json(recruiter.postedJobs);
  } catch (error) {
    next(new DatabaseError());
  }
};

// Apply to a job
exports.applyJob = async (req, res, next) => {
  const { id } = req.params;  // job ID
  const userId = req.user._id;  // assumed user ID from auth middleware

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    // Check if the job exists
    const job = await Job.findById(id);
    if (!job) {
      return next(new NotFoundError('Job not found'));
    }

    // Check if the user has already applied to the job
    if (user.appliedJobs.includes(job._id)) {
      return next(new ValidationError('You have already applied to this job'));
    }

    // Apply to the job
    user.appliedJobs.push(job._id);
    await user.save();
    
    res.status(200).json({
      status: 'success',
      message: "Applied to job successfully"
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

// Get all jobs a user has applied to
exports.getAppliedJobs = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate('appliedJobs');
    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    res.status(200).json({
      status: 'success',
      data: {
        appliedJobs: user.appliedJobs
      }
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

// Get jobs that match a user's resume
exports.getMatchedJobs = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate('resume');
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

    res.status(200).json({
      status: 'success',
      data: {
        matchedJobs
      }
    });
  } catch (error) {
    next(new DatabaseError());
  }
};

