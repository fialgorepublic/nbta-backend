const User = require("../../../../models/user")
const { successResponse } = require("../../../../utils/response")
const {aysncMiddleware} = require('../../../../middlewares/async')
const Investment = require('../../../../models/investment')
const verifiedInvestors = aysncMiddleware( async (req, res, next) => {
    const { userInvestments } = req.query
    console.log('====================', userInvestments)
    if (userInvestments === 'true') {
        const investments = await Investment.find({ investor: { $exists: true } });
        const investorIds = [...new Set(investments.map(investment => investment.investor))];
        const investors =  await User.find({ _id: { $in: investorIds } });
        return successResponse(res, 'Verified Investors', investors)
    }else {
        const investors = await User.find({role: 'investor', kyc_status: 'Verified'})
        return successResponse(res, 'Verified Investors', investors)
    }
})

module.exports = verifiedInvestors