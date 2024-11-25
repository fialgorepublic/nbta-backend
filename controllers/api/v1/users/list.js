const User = require('../../../../models/user')
const {successResponse} = require('../../../../utils/response')
const {aysncMiddleware} = require('../../../../middlewares/async')

const allInvestors = aysncMiddleware( async (req, res, next) => {
    const users = await User.find({role: 'investor'})
    return successResponse(res, 'All Investors', users)
})

module.exports = allInvestors