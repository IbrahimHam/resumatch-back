const express = require('express');
const jobController = require('../controllers/jobController');

const jobRoutes = express.Router();

jobRoutes.get('/', jobController.getJobs);

jobRoutes.get('/:id', jobController.getJob);

module.exports = jobRoutes; 