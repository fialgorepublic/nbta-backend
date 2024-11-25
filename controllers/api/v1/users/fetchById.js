const {successResponse} = require('../../../../utils/response')
const User = require('../../../../models/user')
const {aysncMiddleware} = require('../../../../middlewares/async')

const fetchById = aysncMiddleware(async (req, res, next) => {
  const { id } = req.params

  const user = await User.findOne({_id: id})
  return successResponse(res, 'User Details', user) 
})

module.exports = fetchById;