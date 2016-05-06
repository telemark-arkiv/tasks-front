'use strict'

var Boom = require('boom')

function ping (request, reply) {
  var pattern = {cmd: 'ping', type: 'test'}
  var payload = request.query

  request.seneca.act(pattern, payload, function (error, data) {
    if (error) {
      return reply(Boom.internal(error))
    } else {
      return reply(data)
    }
  })
}

function getUsersTasks (request, reply) {
  var pattern = {role: 'tasks', type: 'user', user: request.params.userid}
  var payload = {}

  request.seneca.act(pattern, payload, function (error, data) {
    if (error) {
      return reply(Boom.internal(error))
    }
    return reply(data)
  })
}

module.exports.ping = ping

module.exports.getUsersTasks = getUsersTasks
