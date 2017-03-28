const subscriber = require('./sub')
const publisher = require('./pub')

function RedisService (store) {
  this.store = store
  return this
}

RedisService.prototype.init = function init () {
  subscriber.init(this.store)
  publisher.init(this.store)
  return this
}

RedisService.prototype.publish = function publish (channel, message) {
  return publisher.send(channel, message)
}

RedisService.prototype.sub = function sub (channel, message) {
  return publisher.receive(channel, message)
}

module.exports = RedisService
