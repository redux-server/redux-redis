'use strict'

var dotenv = require('dotenv')

// Pull data from environment and from .env
dotenv.load()

function configWarning (value, message) {
  console.log('CONFIG WARNING - ' + message)
  return value
}


/*eslint-disable*/
var config = {
  name: process.env.SERVICE_NAME || 'REDUX_REDIS_SERVER',
  env: process.env.NODE_ENV || 'development',
  debug: process.env.DEBUG || 1,
  // Service listen port 
  port: process.env.PORT || 3000,
  seedDB: process.env.SEED_DB || false,
  // Logging configuration
  logDir: process.env.LOG_DIR || configWarning(false, 'LOG_DIR not set, logging to process.stdout'),
  logName: process.env.LOG_NAME || 'service',
  logStash: process.env.LOGSTASH || configWarning(false, 'LOGSTASH destination not set, recommended value: localhost:9200'),
  logInterval: process.env.LOG_INTERVAL || configWarning(false, 'LOG_INTERVAL is not set, recommended value: 5000'),


  // CORS configuration
  useCors: process.env.USE_CORS || false,

  // Express Body-Parser configuration
  bodyParserLimit: process.env.BODY_PARSER_LIMIT || false,
  api_table: false,
  defaultDate: process.env.DEFAULT_DATE,
  // Redis config
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    inbound: process.env.INBOUND_CHANNEL,
    outbound: process.env.OUT_CHANNEL,
    error: process.env.ERROR_CHANNE
  },
  api_table: true,
  // Session Config
  session: {
    secret: process.env.SESSION_SECRET || configWarning('this.is.not.secure', 'SESSION_SECRET set to a non-secure value'),
    maxage: process.env.SESSION_MAXAGE || 3600000,
    saveUninitialized: process.env.SESSION_SAVE_UNINITIALIZED || false,
    expiresIn: 60 * 60 * 24 * 30 // days last number
  }
};


if (config.env === 'development') { console.log('DEVELOPMENT MODE'); }

/*eslint-enable*/
// Export config
module.exports = config
