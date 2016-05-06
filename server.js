'use strict'

var PORT = process.env.TASKS_FRONT_PORT || 8000

// Our hapi server bits
var Chairo = require('chairo')
var Hapi = require('hapi')
var Seneca = require('seneca')()
Seneca.use('entity')

// Our server routes
var ApiRoutes = require('./routes/api')

function endIfError (error) {
  if (error) {
    console.error(error)
    process.exit(1)
  }
}

var server = new Hapi.Server()
server.connection({port: PORT})

var plugins = [
  {register: Chairo, options: {seneca: Seneca}}
]

server.register(plugins, function (error) {
  endIfError(error)
})

server.route(ApiRoutes)

var seneca = server.seneca

seneca.use('mesh', {auto: true})

seneca.log.info('hapi', server.info)

server.start(endIfError)
