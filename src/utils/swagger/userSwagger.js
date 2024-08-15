/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - fullName
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               password:
 *                 type: string
 *                 example: "strongpassword123"
 *     responses:
 *       201:
 *         description: Successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "jwt-token"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60d5f5f4d7c4e9b52d20a89a"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     fullName:
 *                       type: string
 *                       example: "John Doe"
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 *
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
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
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "strongpassword123"
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
 *                   example: "jwt-token"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60d5f5f4d7c4e9b52d20a89a"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     fullName:
 *                       type: string
 *                       example: "John Doe"
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 *
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get the logged-in user data
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "60d5f5f4d7c4e9b52d20a89a"
 *                         email:
 *                           type: string
 *                           example: "johndoe@example.com"
 *                         fullName:
 *                           type: string
 *                           example: "John Doe"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *
 * @swagger
 * /create-resume-data:
 *   post:
 *     summary: Create or update resume data for the logged-in user
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["JavaScript", "Node.js", "React"]
 *               experience:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     jobTitle:
 *                       type: string
 *                       example: "Software Engineer"
 *     responses:
 *       201:
 *         description: Successfully created or updated resume data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     resume:
 *                       type: object
 *                       properties:
 *                         skills:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["JavaScript", "Node.js", "React"]
 *                         experience:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               jobTitle:
 *                                 type: string
 *                                 example: "Software Engineer"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *
 * @swagger
 * /resume-data:
 *   get:
 *     summary: Get resume data of the logged-in user
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched resume data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     resume:
 *                       type: object
 *                       properties:
 *                         skills:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["JavaScript", "Node.js", "React"]
 *                         experience:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               jobTitle:
 *                                 type: string
 *                                 example: "Software Engineer"
 *       404:
 *         description: Resume data not found
 *       500:
 *         description: Internal server error
 *
 * @swagger
 * /apply-job/{id}:
 *   post:
 *     summary: Apply to a job by ID
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d5f5f4d7c4e9b52d20a89a"
 *     responses:
 *       200:
 *         description: Successfully applied to the job
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Applied to job successfully"
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 *
 * @swagger
 * /applied-jobs:
 *   get:
 *     summary: Get all jobs the user has applied to
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched applied jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 appliedJobs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "60d5f5f4d7c4e9b52d20a89a"
 *                       title:
 *                         type: string
 *                         example: "Software Engineer"
 *                       location:
 *                         type: string
 *                         example: "San Francisco, CA"
 *                       description:
 *                         type: string
 *                         example: "A software engineering position focusing on backend development."
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
