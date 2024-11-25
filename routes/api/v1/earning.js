const express = require('express')
const app = express.Router()
const ensureAuth = require('../../../middlewares/ensure-auth')
const {create, allEarnings} = require('../../../controllers/api/v1/manage_earnings')
app.post('/create', create)
app.get('/list',ensureAuth,  allEarnings)
module.exports = app