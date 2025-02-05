const {successResponse, errorResponse} = require('../../../../utils/response')
const User = require('../../../../models/user')
const {aysncMiddleware} = require('../../../../middlewares/async')

const create = aysncMiddleware( async (req, res, next) => {
  
  const {first_name, last_name, email, password} = req.body

  const user = await User.findOne({email: email})

  if (user) {
    return errorResponse(res, 'User already Exist')
  }
  
  const newUser = await User.create({first_name, last_name, email, password, role: 'investor'})
  return successResponse(res, 'Investor create successfully', newUser)


})

module.exports = create