const express = require('express');
const router = express.Router();
const PriceOracle = require('../../../models/priceOracle');
const ensureAuth = require('../../../middlewares/ensure-auth'); // Assuming you have auth middleware


// Get price history
router.get('/history', ensureAuth, async (req, res) => {
  try {
    const history = await PriceOracle.find()
      .sort({ createdAt: -1 })
      .populate('updatedBy', 'first_name last_name')
      .limit(100); // Limit to last 100 records
    
    res.json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update price
router.post('/update', ensureAuth, async (req, res) => {
  try {
    const { price } = req.body;
    
    if (!price || isNaN(price)) {
      return res.status(400).json({ success: false, message: 'Invalid price value' });
    }


    console.log("CURRRENT: " +JSON.stringify(req.currentUser, null, 4))
       
    const newPriceRecord = new PriceOracle({
      price,
      updatedBy: req.currentUser._id // Assuming your auth middleware adds user to req
    });

    await newPriceRecord.save();
    /**/
    res.json({ success: true, data: newPriceRecord });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/current', ensureAuth, async (req, res) => {
    try {
      const currentPrice = await PriceOracle.findOne()
        .sort({ createdAt: -1 })
        .select('price createdAt');
      
      res.json({ 
        success: true, 
        data: currentPrice || { price: 0, createdAt: null } 
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

module.exports = router;