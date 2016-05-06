'use strict'

var config = {
  TASKS_FRONT_PORT: process.env.TASKS_FRONT_PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET || 'Louie Louie, oh no, I got to go'
}

module.exports = config
