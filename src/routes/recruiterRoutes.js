const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', recruiterController.registerRecruiter);

router.post('/login', recruiterController.loginRecruiter);

router.post('/create-company', authMiddleware, recruiterController.createCompany);

router.post('/create-job', authMiddleware, recruiterController.createJob);

router.get('/posted-jobs', authMiddleware, recruiterController.getPostedJobs);

module.exports = router;
