module.exports = ({dispatch, getState}) => next => action => {
  if (!Array.isArray(action)) {
    return next(action)
  }
  return action.reduce((result, accumAction) => {
    return result.then(() => {
      if (Array.isArray(action)) {
        return Promise.all(accumAction.map(item => dispatch(item)))
      }
      return dispatch(accumAction)
    })
  }, Promise.resolve())
}
