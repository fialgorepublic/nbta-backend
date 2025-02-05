const mongoose = require("mongoose")

const options = {
 dbName: 'nbta_db',
 maxPoolSize: 50,
 socketTimeoutMS: 30000,
 serverSelectionTimeoutMS: 5000
}

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open')
})

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_BASE_URI, options)
    return db;
  } catch (error) {
  }
}

module.exports = {
  connectDB
}