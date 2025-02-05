require('../utils/dotenv')
const {connectDB} = require('../utils/connection-manager')
 const User = require('../models/user')
 const mongoose = require('mongoose')

const seedAdmin = async () => {

  let userExist = await User.findOne({
    email: 'erica@nbtecha.com',
  })

  if (!userExist) {
    let user = new User()
    user.first_name = 'Eric'
    user.last_name = 'Nbtecha'
    user.role = 'admin'
    user.email = 'erica@nbtecha.com'
    user.password = '11223344'
    await user.save()
    console.log('==================Admin created===================')
  }
}

connectDB().then(async () => {
    
  try {
    await seedAdmin()
    mongoose.connection.close()
    return

  } catch (error) {
    console.log('error', error)
  }
})