const express = require('express')
const {login, logout} = require('../../../controllers/api/v1/auth')
const ensureAuth = require('../../../middlewares/ensure-auth')
const app = express.Router()

app.post('/login', login)
app.delete('/logout', ensureAuth, logout)

module.exports = app