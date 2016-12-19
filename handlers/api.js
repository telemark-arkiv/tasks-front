'use strict'

module.exports.getUsersTasks = (request, reply) => {
  const user = request.params.userid
  const pattern = {role: 'tasks', type: 'user', user: user}
  const payload = {}

  console.log(`tasks-front: request tasks for ${user}`)

  request.seneca.act(pattern, payload, (error, data) => {
    if (error) {
      console.log(`tasks-front: error request tasks for ${user} - ${JSON.stringify(error)}`)
      return reply({user: user, data: []})
    } else {
      console.log(`tasks-front: returns tasks for ${user} - found ${data.data.length}`)
      return reply(data)
    }
  })
}
