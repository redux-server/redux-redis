
function index (store) {
  return function (req, res) {
    let state = store.getState()
    res.json(200, state)
  }
}

module.exports = {
  index
}
