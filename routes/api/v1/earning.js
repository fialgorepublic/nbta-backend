const express = require('express')
const app = express.Router()
const ensureAuth = require('../../../middlewares/ensure-auth')
const {create, allEarnings} = require('../../../controllers/api/v1/manage_earnings')

/**
 * @swagger
 * /earnings/create:
 *   post:
 *     summary: Create earnings for an investor
 *     tags: [Earnings]
 *     security:
 *       - bearerAuth: []  # Requires Authorization header
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - investor
 *               - earning_type
 *               - return_percentage
 *               - earningFor
 *             properties:
 *               investor:
 *                 type: string
 *                 description: The ID of the investor
 *                 example: "67a39a727d3ecb6523028f2d"
 *               earning_type:
 *                 type: string
 *                 description: The type of earning (e.g., "dividend", "interest")
 *                 example: "dividend"
 *               return_percentage:
 *                 type: number
 *                 description: The percentage of return on investment
 *                 example: 5.5
 *               earningFor:
 *                 type: string
 *                 description: The time period for which the earning is being processed
 *                 example: "2024-02"
 *     responses:
 *       200:
 *         description: Earnings created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Earnings created successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Bad request - Missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid investor ID"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */
app.post('/create', create)

/**
 * @swagger
 * /earnings/list:
 *   get:
 *     summary: Retrieve all earnings for the authenticated user
 *     tags: [Earnings]
 *     security:
 *       - bearerAuth: []  # Requires Authorization header
 *     responses:
 *       200:
 *         description: Successfully retrieved earnings details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Earnings detail"
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: number
 *                       description: Current balance of the user
 *                       example: 5000.00
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       description: Date of the latest earning
 *                       example: "2024-02-05T12:00:00Z"
 *                     earnings:
 *                       type: array
 *                       description: List of earnings
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "67a39a727d3ecb6523028f2d"
 *                           investor:
 *                             type: string
 *                             example: "67a39a727d3ecb6523028f2d"
 *                           amount:
 *                             type: number
 *                             example: 250.00
 *                           earning_type:
 *                             type: string
 *                             example: "dividend"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-02-05T12:00:00Z"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */
app.get('/list',ensureAuth,  allEarnings)

module.exports = app