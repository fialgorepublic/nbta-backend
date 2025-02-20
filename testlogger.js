// src/config/logger.js (or utils/logger.js, etc.)
const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [] // Important: Start with an empty transports array
});

if (process.env.ON_CLOUD !== 'true') {
  // Development: Console logging
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
} else {
  // Production: CloudWatch logging
  logger.add(new WinstonCloudWatch({
    logGroupName: process.env.CLOUDWATCH_GROUP_NAME || 'nbta_log_group_uat',
    logStreamName: `${process.env.CLOUDWATCH_STREAM_NAME}` || 'nbta_backend', // Template literal OK
    awsRegion: process.env.AWS_REGION || 'us-west-2',
    messageFormatter: ({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`
  }));
}

module.exports = logger;  // CommonJS export