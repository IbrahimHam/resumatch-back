const express = require('express');
const userController = require('../controllers/userController');
const { loginValidator, registerValidator } = require('../middlewares/validators/authValidator');
const validationErrorHandler = require('../middlewares/validationErrorHandler');
const authMiddleware = require('../middlewares/authMiddleware');

const userRoutes = express.Router();

userRoutes.post('/login', loginValidator, validationErrorHandler, userController.login);

userRoutes.post('/register', registerValidator, validationErrorHandler, userController.register);

userRoutes.get('/me', authMiddleware, userController.getUser);

// userRoutes.post('/upload-resume', userController.uploadResume);

userRoutes.post('/create-resume-data', authMiddleware, userController.createResumeData);

userRoutes.get('/resume-data', authMiddleware, userController.getResumeData);

userRoutes.put('/update-resume-data', authMiddleware, userController.updateResumeData);

userRoutes.get('/templates', authMiddleware, userController.getTemplates);

userRoutes.get('/template/:id', authMiddleware, userController.getTemplate);

userRoutes.get('/jobs', authMiddleware, userController.getJobs);

userRoutes.post('/apply-job/:id', authMiddleware, userController.applyJob);

userRoutes.get('/applied-jobs', authMiddleware, userController.getAppliedJobs);

module.exports = userRoutes;