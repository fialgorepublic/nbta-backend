const express = require('express')
const {login, logout} = require('../../../controllers/api/v1/auth')
const ensureAuth = require('../../../middlewares/ensure-auth')
const app = express.Router()

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in a user and returns authentication details
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - platform
 *             properties:
 *               email:
 *                 type: string
 *                 example: "erica@nbtecha.com"
 *               password:
 *                 type: string
 *                 example: "WinnieThePooh12!"
 *               platform:
 *                 type: string
 *                 enum: [adminPanel]
 *                 example: "adminPanel"
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "67a39a727d3ecb6523028f2d"
 *                 first_name:
 *                   type: string
 *                   example: "Erica"
 *                 last_name:
 *                   type: string
 *                   example: "Doe"
 *                 email:
 *                   type: string
 *                   example: "erica@nbtecha.com"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 kyc_status:
 *                   type: string
 *                   example: "approved"
 *                 balance:
 *                   type: number
 *                   example: 500.00
 *                 profile_picture:
 *                   type: string
 *                   nullable: true
 *                   example: "https://example.com/profile.jpg"
 *                 kyc_picture:
 *                   type: string
 *                   nullable: true
 *                   example: "https://example.com/kyc.jpg"
 *                 kyc_docs:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["passport.pdf", "utility-bill.pdf"]
 *       401:
 *         description: Unauthorized - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid email or password"
 *       500:
 *         description: Internal server error
 */
app.post('/login', login)

/**
 * @swagger
 * /auth/logout:
 *   delete:
 *     summary: Logs out a user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []  # Requires an Authorization header
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         description: Bearer token required for authentication
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User Logged out successfully"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized - Invalid token"
 *       500:
 *         description: Internal server error
 */
app.delete('/logout', ensureAuth, logout)

module.exports = app