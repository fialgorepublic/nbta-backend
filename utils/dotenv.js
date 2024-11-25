let nodeEnv = 'development'
let nodeEnvFile = '.env'

require('dotenv').config({path: nodeEnvFile})

process.env.NODE_ENV = nodeEnv
process.env.APP_PORT = process.env.APP_PORT || 3000