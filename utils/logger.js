'use strict'
const path = require('path')
const bunyan = require('bunyan')
const bformat = require('bunyan-format')
const config = require('../config')
let formatOut = bformat({ouputMode: 'short'})

function Logger (config) {
  if (!(this instanceof Logger)) {
    return new Logger(config)
  }
  var loggerConfig = {
    name: config.logName,
    streams: [],
    serializers: bunyan.stdSerializers
  }
  if (config.logDir) {
    var baseLog = path.join(config.logDir, config.logName)
    loggerConfig.streams.push({level: 'debug', path: baseLog + '.log'})
  } else {
    loggerConfig.streams.push({ level: 'trace', stream: formatOut })
  }
  this.logger = bunyan.createLogger(loggerConfig)

  return this.logger
}

module.exports = Logger(config)
