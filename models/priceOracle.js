const mongoose = require('mongoose');

const priceOracleSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PriceOracle', priceOracleSchema);