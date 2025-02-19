const loadConfig = require('./utils/dotenv.js'); // Import configuration loader

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const apiRoutes = require('./routes/api/v1');
const { connectDB } = require('./utils/connection-manager');
const swaggerDocs = require('./swagger');

const app = express();



loadConfig().then(() => {
  const logger = require('./utils/Logger.js')
  logger.info("ALI!!!!!!!!!!! We made it ali!")
  app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
  app.use(express.json({ limit: '50mb' }));
  app.use(morgan('common'));
  app.use('/storage', express.static(path.join(__dirname, './storage')));
  app.use(cors());

  app.use('/api/v1', apiRoutes);
  swaggerDocs(app);

  function listRoutes() {
    const routes = [];
    
    function processLayer(layer, prefix = '') {
      if (layer.route) {
        routes.push({
          method: Object.keys(layer.route.methods)[0].toUpperCase(),
          path: prefix + layer.route.path,
        });
      } else if (layer.name === 'router' && layer.handle.stack) {
        layer.handle.stack.forEach((nestedLayer) => {
          processLayer(nestedLayer, prefix + (layer.regexp.source.replace(/\\/g, '').replace('^', '').replace('?', '')));
        });
      }
    }

    app._router.stack.forEach(layer => processLayer(layer));
    console.table(routes);
  }

  listRoutes();

  connectDB().then(() => {
    app.listen(process.env.APP_PORT, () => {
      console.log(`App listening on port ${process.env.APP_PORT}`);
    });
  });

  process.on('SIGINT', async () => {
    mongoose.connection.close();
    process.exit(0);
  });
}).catch(error => {
  console.error('Failed to load configuration:', error);
  process.exit(1);
});
