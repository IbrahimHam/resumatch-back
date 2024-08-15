/**
 * @swagger
 * /company/create:
 *   post:
 *     summary: Creates a new company
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - location
 *               - employeesNumber
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tech Innovators Inc."
 *               description:
 *                 type: string
 *                 example: "A leading tech company specializing in innovative solutions."
 *               image:
 *                 type: string
 *                 example: "https://example.com/logo.png"
 *               location:
 *                 type: string
 *                 example: "San Francisco, CA"
 *               website:
 *                 type: string
 *                 example: "https://techinnovators.com"
 *               employeesNumber:
 *                 type: string
 *                 example: "150"
 *     responses:
 *       201:
 *         description: Successfully created company
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
 *                     _id:
 *                       type: string
 *                       example: "60d5f5f4d7c4e9b52d20a89a"
 *                     name:
 *                       type: string
 *                       example: "Tech Innovators Inc."
 *                     description:
 *                       type: string
 *                       example: "A leading tech company specializing in innovative solutions."
 *                     image:
 *                       type: string
 *                       example: "https://example.com/logo.png"
 *                     location:
 *                       type: string
 *                       example: "San Francisco, CA"
 *                     website:
 *                       type: string
 *                       example: "https://techinnovators.com"
 *                     employeesNumber:
 *                       type: string
 *                       example: "150"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 * 
 * /company:
 *   get:
 *     summary: Get all companies
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: List of all companies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d5f5f4d7c4e9b52d20a89a"
 *                       name:
 *                         type: string
 *                         example: "Tech Innovators Inc."
 *                       description:
 *                         type: string
 *                         example: "A leading tech company specializing in innovative solutions."
 *                       image:
 *                         type: string
 *                         example: "https://example.com/logo.png"
 *                       location:
 *                         type: string
 *                         example: "San Francisco, CA"
 *                       website:
 *                         type: string
 *                         example: "https://techinnovators.com"
 *                       employeesNumber:
 *                         type: string
 *                         example: "150"
 *       500:
 *         description: Internal server error
 * 
 * /company/{id}:
 *   get:
 *     summary: Get a company by ID
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d5f5f4d7c4e9b52d20a89a"
 *     responses:
 *       200:
 *         description: Company details
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
 *                     _id:
 *                       type: string
 *                       example: "60d5f5f4d7c4e9b52d20a89a"
 *                     name:
 *                       type: string
 *                       example: "Tech Innovators Inc."
 *                     description:
 *                       type: string
 *                       example: "A leading tech company specializing in innovative solutions."
 *                     image:
 *                       type: string
 *                       example: "https://example.com/logo.png"
 *                     location:
 *                       type: string
 *                       example: "San Francisco, CA"
 *                     website:
 *                       type: string
 *                       example: "https://techinnovators.com"
 *                     employeesNumber:
 *                       type: string
 *                       example: "150"
 *       404:
 *         description: Company not found
 *       500:
 *         description: Internal server error
 * 
 * /company/{id}/jobs:
 *   get:
 *     summary: Get all jobs posted by a company
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d5f5f4d7c4e9b52d20a89a"
 *     responses:
 *       200:
 *         description: List of jobs posted by the company
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d5f5f4d7c4e9b52d20a89b"
 *                       title:
 *                         type: string
 *                         example: "Software Engineer"
 *                       description:
 *                         type: string
 *                         example: "Develop and maintain software applications."
 *                       requirements:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             skill:
 *                               type: string
 *                               example: "JavaScript"
 *                             level:
 *                               type: string
 *                               example: "Expert"
 *                       companyId:
 *                         type: string
 *                         example: "60d5f5f4d7c4e9b52d20a89a"
 *                       jobType:
 *                         type: string
 *                         example: "Full-time"
 *                       location:
 *                         type: string
 *                         example: "San Francisco, CA"
 *                       postedDate:
 *                         type: string
 *                         format: date-time
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "JavaScript"
 *       404:
 *         description: Company not found
 *       500:
 *         description: Internal server error
 */
