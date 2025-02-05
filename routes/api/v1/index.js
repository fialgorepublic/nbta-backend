const express = require('express')
const auth = require('./auth')
const users = require('./user')
const investments = require('./investment')
const earnings = require('./earning')
const router = express.Router()

router.use('/auth', auth)
router.use('/users', users)
router.use('/investments', investments)
router.use('/earnings', earnings)
module.exports = router