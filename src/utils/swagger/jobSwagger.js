/**
 * @swagger
 * /job:
 *   post:
 *     summary: Create a new job
 *     tags: [Job]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - companyId
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
 *               companyId:
 *                 type: string
 *                 format: objectId
 *               jobType:
 *                 type: string
 *               location:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Job created successfully
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
 *                 companyId:
 *                   type: string
 *                   format: objectId
 *                 jobType:
 *                   type: string
 *                 location:
 *                   type: string
 *                 postedDate:
 *                   type: string
 *                   format: date-time
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 * 
 * /job/{_id}:
 *   put:
 *     summary: Update a job by ID
 *     tags: [Job]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Job ID
 *         schema:
 *           type: string
 *           format: objectId
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
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Job updated successfully
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
 *                 postedDate:
 *                   type: string
 *                   format: date-time
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Job]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Job ID
 *         schema:
 *           type: string
 *           format: objectId
 *     responses:
 *       204:
 *         description: Job deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 *   get:
 *     summary: Get all job
 *     tags: [Job]
 *     responses:
 *       200:
 *         description: A list of job
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
 *                           companyId:
 *                             type: string
 *                             format: objectId
 *                           jobType:
 *                             type: string
 *                           location:
 *                             type: string
 *                           postedDate:
 *                             type: string
 *                             format: date-time
 *                           tags:
 *                             type: array
 *                             items:
 *                               type: string
 *       500:
 *         description: Internal server error
 * 
 * /job/{id}:
 *   get:
 *     summary: Get a job by ID
 *     tags: [Job]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Job ID
 *         schema:
 *           type: string
 *           format: objectId
 *     responses:
 *       200:
 *         description: Job details
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
 *                         companyId:
 *                           type: string
 *                           format: objectId
 *                         jobType:
 *                           type: string
 *                         location:
 *                           type: string
 *                         postedDate:
 *                           type: string
 *                           format: date-time
 *                         tags:
 *                           type: array
 *                           items:
 *                             type: string
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 * 
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         requirements:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               skill:
 *                 type: string
 *               level:
 *                 type: string
 *         companyId:
 *           type: string
 *           format: objectId
 *         jobType:
 *           type: string
 *         location:
 *           type: string
 *         postedDate:
 *           type: string
 *           format: date-time
 *         tags:
 *           type: array
 *           items:
 *             type: string
 */
