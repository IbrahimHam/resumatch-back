/**
 * @swagger
 * /job:
 *   post:
 *     summary: Create a new job
 *     tags: [Job]
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
 *   get:
 *     summary: Get all jobs
 *     tags: [Job]
 *     responses:
 *       200:
 *         description: List of all jobs
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
 *                     jobs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           description:
 *                             type: string
 *                           requirements:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 skill:
 *                                   type: string
 *                                 level:
 *                                   type: string
 *                           jobType:
 *                             type: string
 *                           location:
 *                             type: string
 *                           tags:
 *                             type: string
 *                           companyId:
 *                             type: string
 *       500:
 *         description: Internal server error
 * 
 * /job/{id}:
 *   get:
 *     summary: Get a job by ID
 *     tags: [Job]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved job
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
 *                     job:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         title:
 *                           type: string
 *                         description:
 *                           type: string
 *                         requirements:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               skill:
 *                                 type: string
 *                               level:
 *                                 type: string
 *                         jobType:
 *                           type: string
 *                         location:
 *                           type: string
 *                         tags:
 *                           type: string
 *                         companyId:
 *                           type: string
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 * 
 *   put:
 *     summary: Update a job by ID
 *     tags: [Job]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *       200:
 *         description: Successfully updated job
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
 *                     job:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         title:
 *                           type: string
 *                         description:
 *                           type: string
 *                         requirements:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               skill:
 *                                 type: string
 *                               level:
 *                                 type: string
 *                         jobType:
 *                           type: string
 *                         location:
 *                           type: string
 *                         tags:
 *                           type: string
 *                         companyId:
 *                           type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 * 
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Job]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Successfully deleted job
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 * 
 * /job/posted-jobs:
 *   get:
 *     summary: Get all jobs posted by the authenticated recruiter
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
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
 * @swagger
 * /job/applied:
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
 * 
 * @swagger
 * /job/matched-jobs:
 *   get:
 *     summary: Get jobs that match the user's resume and preferences
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []  # Use JWT for authorization
 *     responses:
 *       200:
 *         description: A list of jobs that match the user's profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     matchedJobs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "60d21b4667d0d8992e610c85"
 *                           title:
 *                             type: string
 *                             example: "Software Engineer"
 *                           description:
 *                             type: string
 *                             example: "Develop and maintain software solutions."
 *                           companyId:
 *                             type: string
 *                             example: "60d21b4567d0d8992e610c83"
 *                           jobType:
 *                             type: string
 *                             example: "Full-time"
 *                           location:
 *                             type: string
 *                             example: "New York, NY"
 *                           tags:
 *                             type: array
 *                             items:
 *                               type: string
 *                               example: "Software, Engineering"
 *       401:
 *         description: Unauthorized - Invalid or missing JWT token
 *       500:
 *         description: Internal server error
 * 
 * @swagger
 * /job/{id}/apply:
 *   post:
 *     summary: Apply to a specific job by ID
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []  # Use JWT for authorization
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d21b4667d0d8992e610c85"
 *         description: The ID of the job to apply to
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
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Applied to job successfully"
 *       400:
 *         description: Bad request - The user has already applied to this job
 *       401:
 *         description: Unauthorized - Invalid or missing JWT token
 *       404:
 *         description: Not found - The job with the specified ID was not found
 *       500:
 *         description: Internal server error
 */
