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
 * /user/create-resume-data:
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
 * /user/resume-data:
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
 * /user/update-resume-data:
 *   put:
 *     summary: Update the user's resume data
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []  # Use JWT for authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contactInfo:
 *                 type: object
 *                 properties:
 *                   phone:
 *                     type: string
 *                     example: "+1234567890"
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "user@example.com"
 *                   address:
 *                     type: string
 *                     example: "123 Main St, City, Country"
 *               user:
 *                 type: string
 *                 example: "John Doe"
 *               summary:
 *                 type: string
 *                 example: "A highly motivated software engineer with 5+ years of experience..."
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "JavaScript"
 *               experience:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     jobTitle:
 *                       type: string
 *                       example: "Software Engineer"
 *                     company:
 *                       type: string
 *                       example: "Tech Company"
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       example: "2019-01-01"
 *                     endDate:
 *                       type: string
 *                       format: date
 *                       example: "2021-12-31"
 *                     description:
 *                       type: string
 *                       example: "Developed and maintained web applications..."
 *               education:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     institution:
 *                       type: string
 *                       example: "University of Technology"
 *                     degree:
 *                       type: string
 *                       example: "Bachelor of Science in Computer Science"
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       example: "2015-09-01"
 *                     endDate:
 *                       type: string
 *                       format: date
 *                       example: "2019-06-30"
 *               languages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "English"
 *               references:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "Available upon request"
 *               certificates:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     institution:
 *                       type: string
 *                       example: "Certification Authority"
 *                     title:
 *                       type: string
 *                       example: "Certified Software Developer"
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2020-06-01"
 *     responses:
 *       200:
 *         description: Successfully updated the resume data
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
 *                     resume:
 *                       type: object
 *                       properties:
 *                         contactInfo:
 *                           type: object
 *                           properties:
 *                             phone:
 *                               type: string
 *                               example: "+1234567890"
 *                             email:
 *                               type: string
 *                               example: "user@example.com"
 *                             address:
 *                               type: string
 *                               example: "123 Main St, City, Country"
 *                         user:
 *                           type: string
 *                           example: "John Doe"
 *                         summary:
 *                           type: string
 *                           example: "A highly motivated software engineer with 5+ years of experience..."
 *                         skills:
 *                           type: array
 *                           items:
 *                             type: string
 *                             example: "JavaScript"
 *                         experience:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               jobTitle:
 *                                 type: string
 *                                 example: "Software Engineer"
 *                               company:
 *                                 type: string
 *                                 example: "Tech Company"
 *                               startDate:
 *                                 type: string
 *                                 format: date
 *                                 example: "2019-01-01"
 *                               endDate:
 *                                 type: string
 *                                 format: date
 *                                 example: "2021-12-31"
 *                               description:
 *                                 type: string
 *                                 example: "Developed and maintained web applications..."
 *                         education:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               institution:
 *                                 type: string
 *                                 example: "University of Technology"
 *                               degree:
 *                                 type: string
 *                                 example: "Bachelor of Science in Computer Science"
 *                               startDate:
 *                                 type: string
 *                                 format: date
 *                                 example: "2015-09-01"
 *                               endDate:
 *                                 type: string
 *                                 format: date
 *                                 example: "2019-06-30"
 *                         languages:
 *                           type: array
 *                           items:
 *                             type: string
 *                             example: "English"
 *                         references:
 *                           type: array
 *                           items:
 *                             type: string
 *                             example: "Available upon request"
 *                         certificates:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               institution:
 *                                 type: string
 *                                 example: "Certification Authority"
 *                               title:
 *                                 type: string
 *                                 example: "Certified Software Developer"
 *                               date:
 *                                 type: string
 *                                 format: date
 *                                 example: "2020-06-01"
 *       404:
 *         description: User or resume data not found
 *       500:
 *         description: Internal server error
 * 
 * @swagger
 * /user/upload-resume:
 *   post:
 *     summary: Upload and process a resume PDF file
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []  # Use JWT for authorization
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The PDF file of the resume to be uploaded
 *     responses:
 *       200:
 *         description: Successfully processed the resume and returned formatted data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     resume:
 *                       type: object
 *                       properties:
 *                         contactInfo:
 *                           type: object
 *                           properties:
 *                             phone:
 *                               type: string
 *                               example: "+1234567890"
 *                             email:
 *                               type: string
 *                               example: "user@example.com"
 *                             address:
 *                               type: string
 *                               example: "123 Main St, City, Country"
 *                         user:
 *                           type: string
 *                           example: "John Doe"
 *                         summary:
 *                           type: string
 *                           example: "A highly motivated software engineer with 5+ years of experience..."
 *                         skills:
 *                           type: array
 *                           items:
 *                             type: string
 *                             example: "JavaScript"
 *                         experience:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               jobTitle:
 *                                 type: string
 *                                 example: "Software Engineer"
 *                               company:
 *                                 type: string
 *                                 example: "Tech Company"
 *                               startDate:
 *                                 type: string
 *                                 format: date
 *                                 example: "2019-01-01"
 *                               endDate:
 *                                 type: string
 *                                 format: date
 *                                 example: "2021-12-31"
 *                               description:
 *                                 type: string
 *                                 example: "Developed and maintained web applications..."
 *                         education:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               institution:
 *                                 type: string
 *                                 example: "University of Technology"
 *                               degree:
 *                                 type: string
 *                                 example: "Bachelor of Science in Computer Science"
 *                               startDate:
 *                                 type: string
 *                                 format: date
 *                                 example: "2015-09-01"
 *                               endDate:
 *                                 type: string
 *                                 format: date
 *                                 example: "2019-06-30"
 *                         languages:
 *                           type: array
 *                           items:
 *                             type: string
 *                             example: "English"
 *                         references:
 *                           type: array
 *                           items:
 *                             type: string
 *                             example: "Available upon request"
 *                         certificates:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               institution:
 *                                 type: string
 *                                 example: "Certification Authority"
 *                               title:
 *                                 type: string
 *                                 example: "Certified Software Developer"
 *                               date:
 *                                 type: string
 *                                 format: date
 *                                 example: "2020-06-01"
 *       400:
 *         description: Resume processing failed
 *       500:
 *         description: Failed to process resume
 */
