'use strict'

const handlers = require('../handlers/api')

module.exports = [
 {
    method: 'GET',
    path: '/user/{userid}',
    config: {
      handler: handlers.getUsersTasks,
      description: 'Get all tasks for a user'
    }
  }
]
