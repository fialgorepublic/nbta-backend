const mongoose = require('mongoose')
const {Schema} = mongoose

const investmentReturnSchema = new Schema({
    earning_type: {
        type: String,
        enum: ['profit', 'loss']
    },
    return_percentage: {
        type: Number
    },
    investor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    before_earning: {
        type: Number
    },
    after_earning: {
        type: Number
    }
},
{
    timestamps: true
}
)

const InvestmentReturn = mongoose.model('InvestmentReturn', investmentReturnSchema)
module.exports = InvestmentReturn