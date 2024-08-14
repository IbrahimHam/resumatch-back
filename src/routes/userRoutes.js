const express = require('express');
const userController = require('../controllers/userController');
const { loginValidator, registerValidator } = require('../middlewares/validators/authValidator');
const validationErrorHandler = require('../middlewares/validationErrorHandler');

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

// userRoutes.post('/upload-resume', userController.uploadResume);

// userRoutes.post('/create-resume-data', userController.createResumeData);

// userRoutes.put('/update-resume-data', userController.updateResumeData);

userRoutes.get('/templates', userController.getTemplates);

userRoutes.get('/template/:id', userController.getTemplate);

userRoutes.get('/jobs', userController.getJobs);

userRoutes.post('/apply-job/:id', userController.applyJob);

userRoutes.get('/applied-jobs', userController.getAppliedJobs);

module.exports = userRoutes;