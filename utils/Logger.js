// src/config/logger.js
const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `[${timestamp}] ${level}: ${message}`;
    if (Object.keys(metadata).length) {
      msg += ` ${JSON.stringify(metadata)}`;
    }
    return msg;
  })
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info', // Allow setting log level via env variable
  format: logFormat, // Use combined format
  transports: []
});

if (process.env.APP_ENV === 'local') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      logFormat // Consistent format with CloudWatch
    )
  }));
} else {
  logger.add(new WinstonCloudWatch({
    logGroupName: process.env.CLOUDWATCH_GROUP_NAME || 'nbta_log_group_uat',
    logStreamName: process.env.CLOUDWATCH_STREAM_NAME || 'nbta_backend',
    awsRegion: process.env.AWS_REGION || 'us-west-2',
    messageFormatter: ({ level, message, timestamp, ...metadata }) => { // Include metadata
      let msg = `[${timestamp}] ${level}: ${message}`;
      if (Object.keys(metadata).length) {
        msg += ` ${JSON.stringify(metadata)}`;
      }
      return msg;
    },
    json: false, // Set to true if you want JSON logs in CloudWatch
    format: logFormat // Use the same logFormat for consistency
  }));

  // Optional: Add console logging in production as well
  logger.add(new winston.transports.Console({
    format: logFormat
  }));
}

module.exports = logger;