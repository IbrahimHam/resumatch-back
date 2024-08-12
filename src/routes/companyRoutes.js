const express = require('express');
const companyController = require('../controllers/companyController');

const companyRoutes = express.Router();

companyRoutes.get('/', companyController.getCompanies);

companyRoutes.get('/:id', companyController.getCompany);

companyRoutes.get('/:id/jobs', companyController.getCompanyJobs);

module.exports = companyRoutes;