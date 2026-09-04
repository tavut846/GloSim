const path = require('path');
const dotenv = require('dotenv');

// Load root .env and .env.local
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env.local'), override: true });

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', env.int('BACKEND_PORT', 1337)),
  app: {
    keys: env.array('APP_KEYS', ['testKey1', 'testKey2', 'testKey3', 'testKey4']),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
