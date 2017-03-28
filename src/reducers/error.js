const constants = require('../../utils/constants')
const { createReducer } = require('../../utils')

const {ERROR} = constants
const initalState = {}
function handleError (state, action) {
  return Object.assign({}, state, action)
}
module.exports = createReducer(initalState, {
  [ERROR]: handleError
})
