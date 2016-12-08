'use strict'

const Boom = require('boom')

module.exports.getUsersTasks = (request, reply) => {
  const user = request.params.userid
  const pattern = {role: 'tasks', type: 'user', user: user}
  const payload = {}

  console.log(`task-front: request tasks for ${user}`)

  request.seneca.act(pattern, payload, (error, data) => {
    if (error) {
      console.log(`task-front: error request tasks for ${user} - ${JSON.stringify(error)}`)
      return reply(Boom.internal(error))
    }
    console.log(`task-front: returns tasks for ${user}`)
    return reply(data)
  })
}
