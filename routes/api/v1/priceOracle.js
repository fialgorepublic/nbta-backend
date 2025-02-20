const express = require('express');
const router = express.Router();
const { history, update, current} = require('../../../controllers/api/v1/priceOracle.js')
const ensureAuth = require('../../../middlewares/ensure-auth'); // Assuming you have auth middleware
const { authorizeRole } = require('../../../middlewares/roleAuth');


// Get price history
router.get('/history', ensureAuth, authorizeRole, history);

// Update price
router.post('/update', ensureAuth, authorizeRole, update);

router.get('/current', ensureAuth, current);

module.exports = router;
