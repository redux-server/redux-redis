
/**
 * Restify configuration
 */

'use strict'

const restify = require('restify')
const logger = require('../utils/logger')

module.exports = function restifyConfig (server) {
  server.use(restify.acceptParser(server.acceptable))
  server.use(restify.bodyParser({ mapParams: true }))
  server.use(restify.authorizationParser())
  server.use(restify.dateParser())
  server.use(restify.queryParser())
  server.use(restify.gzipResponse())
  server.use(restify.fullResponse())
  server.use(restify.conditionalRequest())

  // Allow 5 requests/second by IP, and burst to 10
  server.use(restify.throttle({
    burst: 100,
    rate: 50,
    ip: true
  }))

  server.on('uncaughtException', function uncaughtExceptionCb (req, res, route, err) {
    var auditer = restify.auditLogger({ log: logger.child({component: 'audit'}) })
    auditer(req, res, route, err)
    res.send(500, 'Unexpected error occured')
  })

  server.on('after', function restifyAuditCb (req, res, route, err) {
    if (route && route.spec.path === 'health') {
      // Skip auditor logging if its health request
      return
    }
    var auditer = restify.auditLogger({ log: logger })
    auditer(req, res, route, err)
  })

  server.pre(function logRequest (req, res, next) {
    req.log.info({ req }, 'Logging Request...')
    next()
  })
}
