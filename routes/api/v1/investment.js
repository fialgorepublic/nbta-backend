const express = require('express')
const {create, allInvestments} = require('../../../controllers/api/v1/investments')
const ensureAuth = require('../../../middlewares/ensure-auth')
const { authorizeRole } = require('../../../middlewares/roleAuth');
const app = express.Router()

/**
 * @swagger
 * /investments/:
 *   post:
 *     summary: Create an investment for one or multiple investors
 *     tags: [Investments]
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
 *               - amount
 *             properties:
 *               investor:
 *                 type: array
 *                 description: Array of investor IDs
 *                 items:
 *                   type: string
 *                 example: ["67a39a727d3ecb6523028f2d", "67a39a727d3ecb6523028f3e"]
 *               amount:
 *                 type: number
 *                 description: Amount to invest
 *                 example: 1000.00
 *     responses:
 *       200:
 *         description: Investment successfully created for user(s)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Investment created for user"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "67a39a727d3ecb6523028f2d"
 *                       balance:
 *                         type: number
 *                         example: 5000.00
 *       400:
 *         description: Bad request - Missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid investor ID or amount"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: Investors not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Investors not Found"
 *       500:
 *         description: Internal server error
 */
app.post('/', ensureAuth, authorizeRole, create)

/**
 * @swagger
 * /investments/list:
 *   get:
 *     summary: Retrieve all investments
 *     tags: [Investments]
 *     security:
 *       - bearerAuth: []  # Requires Authorization header
 *     responses:
 *       200:
 *         description: Successfully retrieved all investments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All Investments"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "67a39a727d3ecb6523028f2d"
 *                       investor:
 *                         type: string
 *                         description: Full name of the investor
 *                         example: "John Doe"
 *                       amount:
 *                         type: number
 *                         description: Investment amount
 *                         example: 1000.00
 *                       createdAt:
 *                         type: string
 *                         format: date
 *                         description: Date when the investment was made
 *                         example: "2024-02-05"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */
app.get('/list', ensureAuth, authorizeRole, allInvestments)
module.exports = app