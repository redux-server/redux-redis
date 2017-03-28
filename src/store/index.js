const root = require('../reducers')
const thunk = require('redux-thunk')
const createLogger = require('redux-debug')
const seq = require('./middleware/seq')
const logger = require('../../utils/logger')
const {
  applyMiddleware,
  compose,
  createStore
} = require('redux')
module.exports = function configureStore (initalState) {
  let reduxLogger = createLogger(logger.info.bind(logger))
  let enhancer = compose(
    applyMiddleware(thunk.default, reduxLogger, seq)
  )
  let store = createStore(root, initalState, enhancer)
  return store
}
