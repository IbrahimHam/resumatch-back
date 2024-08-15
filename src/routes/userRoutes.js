const express = require('express');
const userController = require('../controllers/userController');
const { loginValidator, registerValidator } = require('../middlewares/validators/authValidator');
const validationErrorHandler = require('../middlewares/validationErrorHandler');
const authMiddleware = require('../middlewares/authMiddleware');

const userRoutes = express.Router();

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Makes the user login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid credentials
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 * 
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         fullName:
 *           type: string
 *         email:
 *           type: string
 *         preferences:
 *           type: object
 *           properties:
 *             location:
 *               type: string
 *             jobType:
 *               type: string
 *             industry:
 *               type: string
 */

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