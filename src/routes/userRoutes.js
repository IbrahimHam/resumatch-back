const express = require('express');
const userController = require('../controllers/userController');
const { loginValidator, registerValidator } = require('../middlewares/validators/authValidator');
const validationErrorHandler = require('../middlewares/validationErrorHandler');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../utils/fileUpload').single('file');
const pdfProcessor = require('../middlewares/pdfProcessor');

const userRoutes = express.Router();

userRoutes.post('/login', loginValidator, validationErrorHandler, userController.login);

userRoutes.post('/register', registerValidator, validationErrorHandler, userController.register);

userRoutes.get('/me', authMiddleware, userController.getUser);

userRoutes.post('/upload-resume', authMiddleware, upload, pdfProcessor, userController.processResume);

userRoutes.post('/create-resume-data', authMiddleware, userController.createResumeData);

userRoutes.get('/resume-data', authMiddleware, userController.getResumeData);

userRoutes.put('/update-resume-data', authMiddleware, userController.updateResumeData);

userRoutes.post('/create-template', authMiddleware, userController.createTemplate);

userRoutes.get('/templates', authMiddleware, userController.getTemplates);

userRoutes.get('/latest-resume-pdf-path', authMiddleware, userController.getLatestResumePdfPath);

userRoutes.post('/save-template', authMiddleware, userController.saveTemplate);

userRoutes.post('/send-application/:id', authMiddleware, userController.sendApplication);

userRoutes.get('/template/:id', authMiddleware, userController.getTemplate);

userRoutes.put('/update-template/:id', authMiddleware, userController.updateTemplate);

userRoutes.delete('/delete-template/:id', authMiddleware, userController.deleteTemplate);

module.exports = userRoutes;