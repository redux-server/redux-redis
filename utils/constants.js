const {createConstants} = require('./index')

module.exports = createConstants(
  'ERROR',
  'ADD_TODO',
  'EDIT_TODO',
  'CREATE_TODO',
  'DELETE_TODO',
  'COMPLETE_TODO',
  'COMPLETE_ALL',
  'CLEAR_COMPLETED'
)
