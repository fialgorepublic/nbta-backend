const AWS = require('aws-sdk');
const dotenv = require('dotenv');

async function loadConfig() {
  console.log('Starting configuration loading process...');

  let nodeEnv = process.env.NODE_ENV || 'development';
  console.log(`Detected environment: ${nodeEnv}`);

  if (nodeEnv === 'development') {
    dotenv.config({ path: '.env' });
    console.log('Successfully loaded configuration from .env file');
  } else if (nodeEnv === 'production') {
    try {
      const secretsManager = new AWS.SecretsManager({ region: process.env.AWS_REGION || 'us-east-1' });
      const response = await secretsManager.getSecretValue({ SecretId: process.env.SECRET_NAME || 'myapp/production' }).promise();
      Object.assign(process.env, JSON.parse(response.SecretString));
    } catch (error) {
      console.error('Error loading secrets from AWS:', error);
      dotenv.config({ path: '.env' });
    }
  }

  process.env.APP_PORT = process.env.APP_PORT || 3001;
}

// ✅ Correct CommonJS export
module.exports = loadConfig;
