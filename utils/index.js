const invariant = require('invariant')
const R = require('ramda')

const isFn = R.is(Function)
const identity = R.identity
const methodNames = R.compose(R.keys, R.pickBy(isFn))
const findAction = R.compose(R.head, R.intersection)

function createConstants (...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant
    return acc
  }, {})
}
function createReducer (initalState, handlers) {
  if (handlers['undefined']) {
    console.warn(
      'Reducer contains and \'undefined\' action type' +
      'Have you mispelled a constant'
    )
  }

  return function reducer (state, action) {
    if (!state) state = initalState

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    }
    return state
  }
}


function createAction (type, payloadCreator = identity, metaCreator) {
  invariant(
    isFn(payloadCreator) || R.isNil(payloadCreator),
    'Expected payloadCreator to be a function, undefined or null'
  )
  const finalPayloadCreator = R.isNil(payloadCreator)
    ? identity
    : payloadCreator

  const actionCreator = (...args) => {
    invariant(type, 'Can not create undefined action')
    const hasError = args[0] instanceof Error

    const action = {
      type
    }
    const payload = hasError ? args[0] : finalPayloadCreator(...args)
    if (!R.isNil(payload)) {
      action.payload = payload
    }
    if (hasError || payload instanceof Error) {
      action.error = true
      action.payload = args[0].message
    }
    if (isFn(metaCreator)) {
      action.meta = metaCreator(...args)
    }
    return action
  }
  actionCreator.toString = () => type.toString()
  return actionCreator
}

module.exports = {
  createConstants,
  createReducer,
  createAction,
  methodNames,
  isFn,
  identity,
  findAction
}

