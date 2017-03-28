const {combineReducers} = require('redux')
const error = require('./error')
const todos = require('./todos')


function lastAction (state = null, action) {
  return action
}

module.exports = combineReducers({
  error,
  todos,
  lastAction
})
