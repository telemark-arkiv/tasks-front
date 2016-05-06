'use strict'

var handlers = require('../handlers/api')

module.exports = [
  {
    method: 'GET',
    path: '/ping',
    handler: handlers.ping,
    description: 'Your classic ping',
    auth: false
  },
  {
    method: 'GET',
    path: '/user/{userid}',
    handler: handlers.getUsersTasks,
    description: 'Get all tasks for a user'
  }
]
