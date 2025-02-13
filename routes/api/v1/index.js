const express = require('express')
const auth = require('./auth')
const users = require('./user')
const investments = require('./investment')
const earnings = require('./earning')
const priceOracle = require('./priceOracle')
const router = express.Router()

router.use('/auth', auth)
router.use('/users', users)
router.use('/investments', investments)
router.use('/earnings', earnings)
router.use('/priceOracle', priceOracle)


module.exports = router