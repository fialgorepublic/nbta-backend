const User = require('../../../../models/user')
const bcrypt = require('bcrypt')
const {successResponse, errorResponse} = require('../../../../utils/response')
const {aysncMiddleware} = require('../../../../middlewares/async')

const login = aysncMiddleware(async (req, res, next) => {

  const { email, password, platform } = req.body
  const user = await User.findOne({email: email})

  if ( !user ) {
    return errorResponse(res, 'Invalid Email and Password')
  }
/*
  if (user && user.role === 'investor' && platform === 'adminPanel') {
    return errorResponse(res, 'You are not allowed to login')
  }
    */
  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    return errorResponse(res, 'Invalid Password')
  }

  user.authToken = user.generateAuthToken()
  await user.save()

  let userObj = {
    _id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    token: user.authToken,
    kyc_status: user.kyc_status,
    balance: user.balance || 0,
    profile_picture: user.profile_picture || null,
    kyc_picture: user.kyc_picture || null,
    kyc_docs: user.kyc_docs
  }
  return successResponse(res, 'Successfully login', userObj)
})

module.exports = login