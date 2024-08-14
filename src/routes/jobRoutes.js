const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middlewares/authMiddleware');

const jobRoutes = express.Router();

// Create a job
router.post('/', authMiddleware, jobController.createJob);

// Update a job
router.put('/:id', authMiddleware, jobController.updateJob);

// Delete a job
router.delete('/:id', authMiddleware, jobController.deleteJob);

// Get all jobs
router.get('/', jobController.getJobs);

// Get a job by ID
router.get('/:id', jobController.getJob);

module.exports = router;
