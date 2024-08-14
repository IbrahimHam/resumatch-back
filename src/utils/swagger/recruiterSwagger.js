/**
 * @swagger
 * /recruiter/register:
 *   post:
 *     summary: Registers a new recruiter
 *     tags: [Recruiter]
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
 *                 format: email
 *               fullName:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
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
 *                 recruiter:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     fullName:
 *                       type: string
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 * 
 * /recruiter/login:
 *   post:
 *     summary: Logs in a recruiter
 *     tags: [Recruiter]
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
 *                 recruiter:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     fullName:
 *                       type: string
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 * 
 * /recruiter/create-company:
 *   post:
 *     summary: Creates a new company
 *     tags: [Recruiter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - image
 *               - location
 *               - website
 *               - employeesNumber
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               location:
 *                 type: string
 *               website:
 *                 type: string
 *               employeesNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created company
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 image:
 *                   type: string
 *                 location:
 *                   type: string
 *                 website:
 *                   type: string
 *                 employeesNumber:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 * 
 * /recruiter/create-job:
 *   post:
 *     summary: Posts a new job
 *     tags: [Recruiter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - requirements
 *               - jobType
 *               - location
 *               - tags
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               requirements:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     skill:
 *                       type: string
 *                     level:
 *                       type: string
 *               jobType:
 *                 type: string
 *               location:
 *                 type: string
 *               tags:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created job
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 requirements:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       skill:
 *                         type: string
 *                       level:
 *                         type: string
 *                 jobType:
 *                   type: string
 *                 location:
 *                   type: string
 *                 tags:
 *                   type: string
 *                 companyId:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 * 
 * /recruiter/posted-jobs:
 *   get:
 *     summary: Gets all jobs posted by the recruiter
 *     tags: [Recruiter]
 *     responses:
 *       200:
 *         description: List of posted jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   requirements:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         skill:
 *                           type: string
 *                         level:
 *                           type: string
 *                   jobType:
 *                     type: string
 *                   location:
 *                     type: string
 *                   tags:
 *                     type: string
 *                   companyId:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 * 
 * /recruiter/{id}:
 *   get:
 *     summary: Gets a specific recruiter by ID
 *     tags: [Recruiter]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved recruiter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     recruiter:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         email:
 *                           type: string
 *                         fullName:
 *                           type: string
 *                         companyId:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             location:
 *                               type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recruiter not found
 *       500:
 *         description: Internal server error
 */
