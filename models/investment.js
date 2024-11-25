const mongoose = require('mongoose')
const {Schema} = mongoose;

const investSchema = new Schema({
  amount: {
    type: Number
  },
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamps: true
}
)

const Investment = mongoose.model('Investment', investSchema)
module.exports = Investment