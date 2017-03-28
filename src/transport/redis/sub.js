const invariant = require('invariant')
const path = require('path')
const rootDir = process.cwd()
const config = require(path.join(rootDir, '/config'))
const client = require(path.join(rootDir, '/lib/redis'))(config.redis)
const logger = require(path.join(rootDir, '/utils/logger'))
const utils = require(path.join(rootDir, '/utils'))
const actions = require(path.join(rootDir, '/src/actions'))

console.log(actions)
let subscritions = []

client.setMaxListeners(2)

function init (store) {
  invariant(store, 'A store tree is needed')
  invariant(store.dispatch, 'A broadcast fn is needed')

  const channel = config.redis.inbound

  invariant(channel, 'Channel is needed to subscribe to changes')

  if (!~subscritions.indexOf(channel)) {
    client.subscribe(channel)
    subscritions.push(channel)
    logger.info('subscriber is listening on channels', ...subscritions)
  }
  client.on('message', function redisListener (channel, message) {
    logger.info('subscriber received message on channel', channel, message)
    let payload = formatPayload(channel, message)
    let actionEvent = findAction(payload)
    store.dispatch(actionEvent)
  })
  return client
}

function findAction (payload) {
  const action = utils.methodNames(actions)
  const type = payload.type

  const actionToDispatch = utils.findAction(action, type)

  if (utils.isFn(actions[actionToDispatch])) {
    return actions[actionToDispatch](payload)
  }
  return actions.error(new Error('Action Not Found'))
}

function formatPayload (channel, message) {
  try {
    let o = JSON.parse(message)
    return {type: o.type, payload: o.payload}
  } catch (e) {
    logger.fatal(e, 'Could not unmarshal JSON')
    return actions.error(new Error('Parse Error'))
  }
}

function receive (channel) {
  client.subscribe(channel)
  subscritions.push(channel)
  return client
}

function unsubscribe (channel) {
  client.unsubscribe(channel)
  subscritions = subscritions.filter(chan => chan !== channel)
  return client
}

module.exports = {
  init,
  receive,
  unsubscribe
}
