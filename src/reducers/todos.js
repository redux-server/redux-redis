const { createReducer } = require('../../utils')
const {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL,
  CLEAR_COMPLETED
  } = require('../../utils/constants')

const initialState = []

function add (state, action) {
  return [
    {
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      text: action.payload.text
    },
    ...state
  ]
}

function del (state, action) {
  return state.filter(todo =>
        todo.id !== action.payload.id
      )
}

function edit (state, action) {
  return state.map(todo =>
    todo.id === action.payload.id ? Object.assign(todo, { text: action.payload.text }) : todo
  )
}

function completeTodo (state, action) {
  return state.map(todo =>
          todo.id === action.payload.id
            ? Object.assign(todo, { completed: !todo.completed })
            : todo
      )
}

function completeALL (state) {
  const areAllMarked = state.every(todo => todo.completed)
  return state.map(todo => Object.assign(todo, {
    completed: !areAllMarked
  }))
}

function clearCompleted (state) {
  return state.filter(todo => todo.completed === false)
}

module.exports = createReducer(initialState, {
  [ADD_TODO]: add,
  [DELETE_TODO]: del,
  [EDIT_TODO]: edit,
  [COMPLETE_TODO]: completeTodo,
  [COMPLETE_ALL]: completeALL,
  [CLEAR_COMPLETED]: clearCompleted
})
