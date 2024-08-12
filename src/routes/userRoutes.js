const express = require('express');

const userRoutes = express.Router();

const userController = require('../controllers/userController');

userRoutes.post('/login', userController.login);

userRoutes.post('/register', userController.register);

userRoutes.post('/upload-resume', userController.uploadResume);

userRoutes.post('/create-resume-data', userController.createResumeData);

userRoutes.put('/update-resume-data', userController.updateResumeData);

userRoutes.get('/templates', userController.getTemplates);

userRoutes.get('/template/:id', userController.getTemplate);

userRoutes.get('/jobs', userController.getJobs);

userRoutes.get('/applied-jobs', userController.getAppliedJobs);

module.exports = userRoutes;