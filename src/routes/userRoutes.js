const express = require('express');
const userController = require('../controllers/userController');
const { loginValidator, registerValidator } = require('../middlewares/validators/authValidator');
const validationErrorHandler = require('../middlewares/validationErrorHandler');

const userRoutes = express.Router();

userRoutes.post('/login', loginValidator, validationErrorHandler, userController.login);

userRoutes.post('/register', registerValidator, validationErrorHandler, userController.register);

// userRoutes.post('/upload-resume', userController.uploadResume);

// userRoutes.post('/create-resume-data', userController.createResumeData);

// userRoutes.put('/update-resume-data', userController.updateResumeData);

// userRoutes.get('/templates', userController.getTemplates);

// userRoutes.get('/template/:id', userController.getTemplate);

// userRoutes.get('/jobs', userController.getJobs);

// userRoutes.get('/applied-jobs', userController.getAppliedJobs);

module.exports = userRoutes;