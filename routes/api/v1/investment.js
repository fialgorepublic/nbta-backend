const express = require('express')
const {create, allInvestments} = require('../../../controllers/api/v1/investments')
const ensureAuth = require('../../../middlewares/ensure-auth')
const app = express.Router()

app.post('/', create)
app.get('/list', allInvestments)
module.exports = app