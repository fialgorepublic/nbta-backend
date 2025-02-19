const AWS = require('aws-sdk');
const dotenv = require('dotenv');

async function loadConfig() {
  console.log('Starting configuration loading process...');

  let appenv = process.env.APP_ENV || 'local';
  console.log(`Detected environment: ${appenv}`);  

  if (appenv === 'local') {
    dotenv.config({ path: '.env' });
    console.log('Successfully loaded configuration from .env file');
  } else  {
    console.log("Getting from the server: " + appenv + '/nbta_backend/secrets')
    try {
      const secretsManager = new AWS.SecretsManager({ region: process.env.AWS_REGION || 'us-west-2' });
      console.log("Getting secrets")
      const response = await secretsManager.getSecretValue({ SecretId: process.env.SECRET_NAME || (appenv + '/nbta_backend/secrets') }).promise();
      console.log("BACK FROM SECTETS")
      console.log("RESPONSE: " + response.SecretString)
      Object.assign(process.env, JSON.parse(response.SecretString));
    } catch (error) {
      console.error('Error loading secrets from AWS:', error);
      dotenv.config({ path: '.env' });
    }
    console.log("Done!")
  }

  process.env.APP_PORT = process.env.APP_PORT || 3001;
}

// ✅ Correct CommonJS export
module.exports = loadConfig;
