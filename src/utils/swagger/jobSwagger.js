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
 */
