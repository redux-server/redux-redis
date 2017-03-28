const RedisTransport = require('./redis')

let service = null
function Transport (store) {
  if (service) return service
  service = new RedisTransport(store).init()
  return service
}

module.exports = Transport
