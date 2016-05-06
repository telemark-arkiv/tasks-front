'use strict'

var handlers = require('../handlers/api')

module.exports = [
  {
    method: 'GET',
    path: '/ping',
    config: {
      handler: handlers.ping,
      description: 'Your classic ping',
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/user/{userid}',
    config: {
      handler: handlers.getUsersTasks,
      description: 'Get all tasks for a user'
    }
  }
]
