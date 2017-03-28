
const constants = require('../../utils/constants')
const {createAction} = require('../../utils')

const ADD_TODO = createAction(constants.ADD_TODO)
const DELETE_TODO = createAction(constants.DELETE_TODO)
const EDIT_TODO = createAction(constants.EDIT_TODO)
const COMPLETE_TODO = createAction(constants.COMPLETE_TODO)
const COMPLETE_ALL = createAction(constants.COMPLETE_ALL)
const CLEAR_COMPLETED = createAction(constants.CLEAR_COMPLETED)

module.exports = {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL,
  CLEAR_COMPLETED
}

