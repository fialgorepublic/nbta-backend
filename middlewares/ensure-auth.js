const jwt = require('jsonwebtoken')
const User = require('../models/user')
const {errorResponse} = require('../utils/response')

const ensureAuth = async (req, res, next) => {
  token = req.header('Authorization')

  console.log("ENSURING AUTH 1")
  if (token) {
    // console.log("TOKEN:" + token)
    decode = null
    try {
      console.log("ENSURING AUTH 2")
      decode = await jwt.verify(token, process.env.JWT_SECRET_KEY)
    }catch (error){
      console.log("ENSURING AUTH 3 error")
      return errorResponse(res, 'Invalid Authorization token')
    }

    if (!decode?._id) {
      console.log("ENSURING AUTH 4 error")
      return errorResponse(res, 'Invalid Authorization token')
    }
    const user = await User.findOne({_id: decode?._id})
    if (!user) {
      console.log("ENSURING AUTH 5 error")
      return errorResponse(res, 'Invalid Authorization token')
    }
    req.currentUser = user
    console.log("ENSURING AUTH  6")
    next()
  } else {
    console.log("ENSURING AUTH 00000")
    return errorResponse(res, 'Authorization token is missing')
  }
}

module.exports = ensureAuth