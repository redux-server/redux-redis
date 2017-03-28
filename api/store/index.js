'use strict'

const controller = require('./store.controller')
const RestifyRouter = require('restify-routing')

const router = new RestifyRouter()


module.exports = store => {
  router.get('/', controller.index(store))
  return router
}
