'use strict'

var handlers = require('../handlers/api')

module.exports = [
  {
    method: 'GET',
    path: '/ping',
    handler: handlers.ping
  },
  {
    method: 'GET',
    path: '/user/{userid}',
    handler: handlers.getUsersTasks
  }
]
