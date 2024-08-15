const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new company
router.post('/', authMiddleware, companyController.createCompany);

// Get all companies
router.get('/', companyController.getCompanies);

// Get a company by ID
router.get('/:id', companyController.getCompany);

// Get all jobs posted by a company
router.get('/:id/jobs', companyController.getCompanyJobs);

module.exports = router;