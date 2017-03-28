const error = require('./error')
const todos = require('./todo')

module.exports = Object.assign(
  {},
  {error},
  todos
)
