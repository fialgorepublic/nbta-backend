const {successResponse} = require('../../../../utils/response')
const InvestmentReturn = require('../../../../models/investment_return')
const {aysncMiddleware} = require('../../../../middlewares/async')

const allEarnings = aysncMiddleware( async (req, res, next) => {
    const user = req.currentUser
    const earnings = await InvestmentReturn.find({ investor: user }).sort({ createdAt: -1 });
    const latestEarningDate = earnings.length > 0 ? earnings[0].createdAt : new Date();

    const data = {
        balance: user.balance,
        date: latestEarningDate,
        earnings: earnings
    }

    return successResponse(res, 'Earnings detail', data);
})

module.exports = allEarnings