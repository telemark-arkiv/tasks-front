'use strict'

const Boom = require('boom')

module.exports.getUsersTasks = (request, reply) => {
  var pattern = {role: 'tasks', type: 'user', user: request.params.userid}
  var payload = {}

  request.seneca.act(pattern, payload, (error, data) => {
    if (error) {
      return reply(Boom.internal(error))
    }
    return reply(data)
  })
}
