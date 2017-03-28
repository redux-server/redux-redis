const invariant = require('invariant')
const path = require('path')
const rootDir = process.cwd()
const config = require(path.join(rootDir, '/config'))
const client = require(path.join(rootDir, '/lib/redis'))(config.redis)
const logger = require(path.join(rootDir, '/utils/logger'))

function init (store) {
  invariant(store, 'A store tree is needed')
  invariant(store.subscribe, 'A broadcast fn is needed')
  let message = null
  const channel = config.redis.outbound

  invariant(channel, 'Channel is needed to subscribe to changes')
  const unref = store.subscribe(() => {
    let current = store.getState()
    if (current.lastAction.error) {
      message = JSON.stringify(current.lastAction)
    } else {
      message = JSON.stringify(current.lastAction.payload)
    }
    logger.info('Sending message', channel, message)
    send(channel, message)
  })
  return client
}

function send (channel, message) {
  client.publish(channel, JSON.stringify(message))
}


module.exports = {
  init,
  send
}
