const restify = require('restify')
const bunyan = require('bunyan')
const config = require('./config')
const logger = require('./utils/logger')
const store = require('./src/store')()

let server = restify.createServer({
  name: config.name,
  version: '1.0.0',
  log: logger.child({
    component: 'server',
    level: bunyan.INFO,
    streams: [{
      level: bunyan.DEBUG,
      type: 'raw',
      stream: new restify.bunyan.RequestCaptureStream({
        level: bunyan.WARN,
        maxRecords: 100,
        maxRequestIds: 1000,
        stream: process.stderr
      })
    }],
    serializers: bunyan.stdSerializers
  })
})

// Setup server dont switch ordering
require('./src/transport')(store)
require('./config/restify')(server)
require('./routes')(server, store)

// Start server
function startServer () {
  server.SERVICE_NAME = server.listen(config.port, config.ip, function () {
    logger.info('Node Server listening on %d, in %s mode', config.port, config.env)
    if (config.api_table) {
      require('./utils/table')(server.router.mounts)
    }
  })
}

setImmediate(startServer)

// Expose server
module.exports = server
