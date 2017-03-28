const restify = require('restify')
const RestifyRouter = require('restify-routing')

const rootRouter = new RestifyRouter()

module.exports = function (server, store) {
  rootRouter.use('/v1/store', require('./api/store')(store))

  server.get(/:url(api|bin|config|lib|src|util|node_modules|test)/, restify.errors.NotFoundError)

  rootRouter.applyRoutes(server)
}

