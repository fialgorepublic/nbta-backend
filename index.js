require('./utils/dotenv')
const express = require('express')
const path = require('path')
const mongoose = require("mongoose")
const morgan = require('morgan')
var cors = require('cors')
const apiRoutes = require('./routes/api/v1')
const {connectDB} = require('./utils/connection-manager')
const app = express()
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000}))
app.use(express.json({ limit: '50mb' }))
app.use(morgan('common'))
app.use('/storage', express.static(path.join(__dirname, './storage')))
app.use(cors())

app.use('/api/v1', apiRoutes)


connectDB().then(() => {
  app.listen(process.env.APP_PORT, () => {
    console.log(`App listening on ${process.env.APP_PORT} port`)
  })
})

process.on('SIGINT', async() => {
  mongoose.connection.close();
  process.exit(0)
})
