const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const authMiddleware = require('../middlewares/authMiddleware');
const imageUpload = require('../middlewares/imageUpload');

// Create a new company
router.post('/', authMiddleware, imageUpload, companyController.createCompany);

// Get all companies
router.get('/', companyController.getCompanies);

// Search companies by name
router.get('/search', authMiddleware, companyController.searchCompanies);

// Joining an existing company
router.patch('/join-company', authMiddleware, companyController.joinCompany);

// Get a company by ID
router.get('/:id', companyController.getCompany);

// Get all jobs posted by a company
router.get('/:id/jobs', companyController.getCompanyJobs);

module.exports = router;