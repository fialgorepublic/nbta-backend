const express = require('express')
const { create, ManagekycDoc, fetchById, list, deleteInvestor, update, dashboard, verified, manageProfilePic } = require('../../../controllers/api/v1/users')
const ensureAuth = require('../../../middlewares/ensure-auth')
const app = express.Router()
const upload = require('../../../middlewares/multer')

/**
 * @swagger
 * /users/all-investors:
 *   get:
 *     summary: Retrieve all investors
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires Authorization header
 *     responses:
 *       200:
 *         description: Successfully retrieved all investors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All Investors"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "67a39a727d3ecb6523028f2d"
 *                       first_name:
 *                         type: string
 *                         example: "John"
 *                       last_name:
 *                         type: string
 *                         example: "Doe"
 *                       email:
 *                         type: string
 *                         example: "john@example.com"
 *                       role:
 *                         type: string
 *                         example: "investor"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */
app.get('/all-investors', list)

/**
 * @swagger
 * /users/investors-records:
 *   get:
 *     summary: Retrieve investor and investment statistics for the last 30 days
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires Authorization header
 *     responses:
 *       200:
 *         description: Successfully retrieved investor records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Investor data"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         description: Category title
 *                         example: "Investors"
 *                       value:
 *                         type: string
 *                         description: Total count or amount in the last 30 days
 *                         example: "250"
 *                       interval:
 *                         type: string
 *                         description: Time interval for data aggregation
 *                         example: "Last 30 days"
 *                       trend:
 *                         type: string
 *                         enum: [up, down]
 *                         description: Trend indicator
 *                         example: "up"
 *                       data:
 *                         type: array
 *                         description: Daily data points for the last 30 days
 *                         items:
 *                           type: number
 *                           example: [5, 10, 7, 12, 15, 8]
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */
app.get('/investors-records', dashboard)

/**
 * @swagger
 * /users/verify-investors:
 *   get:
 *     summary: Retrieve verified investors
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires Authorization header
 *     parameters:
 *       - in: query
 *         name: userInvestments
 *         schema:
 *           type: string
 *           enum: ["true", "false"]
 *         required: false
 *         description: If "true", fetches investors who have made investments. Otherwise, fetches KYC-verified investors.
 *     responses:
 *       200:
 *         description: Successfully retrieved verified investors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Verified Investors"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "67a39a727d3ecb6523028f2d"
 *                       first_name:
 *                         type: string
 *                         example: "John"
 *                       last_name:
 *                         type: string
 *                         example: "Doe"
 *                       email:
 *                         type: string
 *                         example: "john@example.com"
 *                       role:
 *                         type: string
 *                         enum: ["admin", "investor"]
 *                         example: "investor"
 *                       balance:
 *                         type: number
 *                         example: 2500.50
 *                       kyc_status:
 *                         type: string
 *                         enum: ["NotStarted", "InProgress", "Verified"]
 *                         example: "Verified"
 *                       profile_picture:
 *                         type: string
 *                         nullable: true
 *                         example: "https://example.com/profile.jpg"
 *                       kyc_picture:
 *                         type: string
 *                         nullable: true
 *                         example: "https://example.com/kyc.jpg"
 *                       kyc_docs:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                               example: "passport.pdf"
 *                             url:
 *                               type: string
 *                               example: "https://example.com/documents/passport.pdf"
 *       400:
 *         description: Bad request - Invalid query parameter
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: No verified investors found
 *       500:
 *         description: Internal server error
 */

app.get('/verify-investors', verified)

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve user details by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires Authorization header
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique user ID
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User Details"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67a39a727d3ecb6523028f2d"
 *                     first_name:
 *                       type: string
 *                       example: "John"
 *                     last_name:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *                     role:
 *                       type: string
 *                       enum: ["admin", "investor"]
 *                       example: "investor"
 *                     balance:
 *                       type: number
 *                       example: 2500.50
 *                     kyc_status:
 *                       type: string
 *                       enum: ["NotStarted", "InProgress", "Verified"]
 *                       example: "Verified"
 *                     profile_picture:
 *                       type: string
 *                       nullable: true
 *                       example: "https://example.com/profile.jpg"
 *                     kyc_picture:
 *                       type: string
 *                       nullable: true
 *                       example: "https://example.com/kyc.jpg"
 *                     kyc_docs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "passport.pdf"
 *                           url:
 *                             type: string
 *                             example: "https://example.com/documents/passport.pdf"
 *       400:
 *         description: Bad request - Invalid ID format
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
app.get('/:id', fetchById)

/**
 * @swagger
 * /users/{id}/delete:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires Authorization header
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique user ID
 *     responses:
 *       200:
 *         description: Successfully deleted the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67a39a727d3ecb6523028f2d"
 *                     first_name:
 *                       type: string
 *                       example: "John"
 *                     last_name:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *                     role:
 *                       type: string
 *                       enum: ["admin", "investor"]
 *                       example: "investor"
 *                     balance:
 *                       type: number
 *                       example: 2500.50
 *                     kyc_status:
 *                       type: string
 *                       enum: ["NotStarted", "InProgress", "Verified"]
 *                       example: "Verified"
 *                     profile_picture:
 *                       type: string
 *                       nullable: true
 *                       example: "https://example.com/profile.jpg"
 *                     kyc_picture:
 *                       type: string
 *                       nullable: true
 *                       example: "https://example.com/kyc.jpg"
 *                     kyc_docs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "passport.pdf"
 *                           url:
 *                             type: string
 *                             example: "https://example.com/documents/passport.pdf"
 *       400:
 *         description: Bad request - Invalid ID format
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
app.delete('/:id/delete', deleteInvestor)

/**
 * @swagger
 * /users/{id}/update:
 *   put:
 *     summary: Update a user's details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires Authorization header
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: Updated first name
 *                 example: "John"
 *               last_name:
 *                 type: string
 *                 description: Updated last name
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 description: Updated email address
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: Updated password (optional)
 *                 example: "NewSecurePassword123!"
 *               kyc_status:
 *                 type: string
 *                 enum: ["NotStarted", "InProgress", "Verified"]
 *                 description: Updated KYC status
 *                 example: "Verified"
 *     responses:
 *       200:
 *         description: Successfully updated user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Investor updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67a39a727d3ecb6523028f2d"
 *                     first_name:
 *                       type: string
 *                       example: "John"
 *                     last_name:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     role:
 *                       type: string
 *                       enum: ["admin", "investor"]
 *                       example: "investor"
 *                     balance:
 *                       type: number
 *                       example: 2500.50
 *                     kyc_status:
 *                       type: string
 *                       enum: ["NotStarted", "InProgress", "Verified"]
 *                       example: "Verified"
 *                     profile_picture:
 *                       type: string
 *                       nullable: true
 *                       example: "https://example.com/profile.jpg"
 *                     kyc_picture:
 *                       type: string
 *                       nullable: true
 *                       example: "https://example.com/kyc.jpg"
 *                     kyc_docs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "passport.pdf"
 *                           url:
 *                             type: string
 *                             example: "https://example.com/documents/passport.pdf"
 *       400:
 *         description: Bad request - Invalid input format
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
app.put('/:id/update', update)

/**
 * @swagger
 * /users/upload-picture:
 *   put:
 *     summary: Upload a profile picture for the authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires Authorization header
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profile_picture:
 *                 type: string
 *                 format: binary
 *                 description: The profile picture file to upload
 *     responses:
 *       200:
 *         description: Successfully updated the profile picture
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile Picture updated"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67a39a727d3ecb6523028f2d"
 *                     first_name:
 *                       type: string
 *                       example: "John"
 *                     last_name:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *                     role:
 *                       type: string
 *                       enum: ["admin", "investor"]
 *                       example: "investor"
 *                     profile_picture:
 *                       type: string
 *                       example: "uploads/profile_pictures/john_doe.jpg"
 *       400:
 *         description: Bad request - No file uploaded
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */
app.put('/upload-picture', ensureAuth, upload.single('profile_picture'), manageProfilePic)

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new investor
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: First name of the user
 *                 example: "John"
 *               last_name:
 *                 type: string
 *                 description: Last name of the user
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: Password for the account
 *                 example: "SecurePass123!"
 *     responses:
 *       200:
 *         description: Successfully registered the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Investor created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67a39a727d3ecb6523028f2d"
 *                     first_name:
 *                       type: string
 *                       example: "John"
 *                     last_name:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     role:
 *                       type: string
 *                       example: "investor"
 *       400:
 *         description: Bad request - Missing required fields or invalid input
 *       409:
 *         description: Conflict - User already exists
 *       500:
 *         description: Internal server error
 */
app.post('/register', create)

/**
 * @swagger
 * /users/kyc-documents:
 *   post:
 *     summary: Upload KYC documents for the authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Requires Authorization header
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               kyc_picture:
 *                 type: string
 *                 format: binary
 *                 description: A single KYC picture
 *               kycDocs:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Additional KYC documents (up to 6 files)
 *     responses:
 *       200:
 *         description: Successfully uploaded KYC documents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "KYC documents uploaded"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67a39a727d3ecb6523028f2d"
 *                     first_name:
 *                       type: string
 *                       example: "John"
 *                     last_name:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     role:
 *                       type: string
 *                       enum: ["admin", "investor"]
 *                       example: "investor"
 *                     kyc_status:
 *                       type: string
 *                       enum: ["NotStarted", "InProgress", "Verified"]
 *                       example: "InProgress"
 *                     kyc_picture:
 *                       type: string
 *                       example: "uploads/kyc/john_doe_kyc.jpg"
 *                     kyc_docs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "passport.pdf"
 *                           url:
 *                             type: string
 *                             example: "https://example.com/documents/passport.pdf"
 *       400:
 *         description: Bad request - No files uploaded
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
app.post('/kyc-documents', ensureAuth, upload.fields([
  { name: 'kyc_picture', maxCount: 1 },
  { name: 'kycDocs', maxCount: 6 }
]), ManagekycDoc)

module.exports = app