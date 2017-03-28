const {createAction} = require('../../utils')
const constants = require('../../utils/constants')

let ERROR = createAction(constants.ERROR)

module.exports = ERROR
