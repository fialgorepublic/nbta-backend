const jwt = require('jsonwebtoken')
const User = require('../models/user')
const {errorResponse} = require('../utils/response')

const ensureAuth = async (req, res, next) => {
  token = req.header('Authorization')

  if (token) {
    decode = null
    try {
      decode = await jwt.verify(token, process.env.APP_JWT_KEY)
    }catch (error){
      return errorResponse(res, 'Invalid Authorization token')
    }

    if (!decode?._id) {
      return errorResponse(res, 'Invalid Authorization token')
    }
    const user = await User.findOne({_id: decode?._id})
    if (!user) {
      return errorResponse(res, 'Invalid Authorization token')
    }
    req.currentUser = user
    next()
  } else {
    return errorResponse(res, 'Authorization token is missing')
  }
}

module.exports = ensureAuth