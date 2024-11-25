const {successResponse, errorResponse} = require('../../../../utils/response')
const User = require('../../../../models/user')
const Investment = require('../../../../models/investment')
const {aysncMiddleware} = require('../../../../middlewares/async')

const investment = aysncMiddleware( async (req, res, next) => {
  const {investor, amount} = req.body

  const investors = await User.find({_id: {$in: investor}})
  
  if (investors.length > 0) {
    investors.map(async (investor) => { 
      const investment = await new Investment()
      investment.amount = amount;
      investment.investor = investor
      await investment.save()
      investor.balance += Number(amount)
      await investor.save()
    })
    return successResponse(res, 'invstment created for user', investors)
  } else {
    return errorResponse(res, 'Investors not Found')
  }
})

module.exports = investment