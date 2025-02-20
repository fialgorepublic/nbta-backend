const jwt = require('jsonwebtoken')
const User = require('../models/user')
const {errorResponse} = require('../utils/response')
const fs = require('fs')
const publicKey = fs.readFileSync("keys/public.pem", "utf8");

const ensureAuth = async (req, res, next) => {


  token = req.header('Authorization')

  console.log("ENSURING AUTH 1")
  if (token) {
    // console.log("TOKEN:" + token)
    decode = null
    try {
      decode = await jwt.verify(token, publicKey, {algorithms: 'RS256'})
    }catch (error){
      console.log("Invalid Authorization token decode")
      return errorResponse(res, 'Invalid Authorization token')
    }

    if (!decode?._id) {
      console.log("Invalid Authorization token _id missing")
      return errorResponse(res, 'Invalid Authorization token')
    }
    const user = await User.findOne({_id: decode?._id})
    if (!user) {
      console.log("Invalid Authorization token user not found")
      return errorResponse(res, 'Invalid Authorization token')
    }
    req.currentUser = user
    next()
  } else {
    console.log("Authorization token is missing")
    return errorResponse(res, 'Authorization token is missing')
  }
}

module.exports = ensureAuth