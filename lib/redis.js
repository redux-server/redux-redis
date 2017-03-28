const redis = require('redis')
const logger = require('../utils/logger')



function redisError (client) {
  return function (err) {
    logger.fatal(err, 'Redis Client Error')
    client.end(true)
  }
};

function retryStrategy (config) {
  return function (redisOptions) {
    if (redisOptions.error && redisOptions.error.code === 'ECONNREFUSED') {
      return new Error('SERVER REFUSED CONNECTION')
    }
    if (redisOptions.total_retry_time > config.retry_time) {
      return new Error('Retry Attemps Exhausted.')
    }
    if (redisOptions.timesConnected > config.timesConnected) {
      logger.fatal('Redis Connect Retry Attemps Exhausted')
      process.exit(1)
    }
  }
}
function RedisClient (config) {
  config.retry_strategy = retryStrategy(config)
  var client = redis.createClient(config.port, config.host, config)
  client.on('error', redisError(client))
  return client
};

module.exports = RedisClient
