'use strict'

var PORT = process.env.TASKS_FRONT_PORT || 8000

// Our hapi server bits
var Chairo = require('chairo')
var Hapi = require('hapi')
var Seneca = require('seneca')()
var validateAPI = require('./lib/validate-api')
var config = require('./config')
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

server.register(require('hapi-auth-jwt2'), function (err) {
  if (err) {
    console.log(err)
  }

  server.auth.strategy('jwt', 'jwt',
    { key: config.JWT_SECRET,          // Never Share your secret key
      validateFunc: validateAPI,            // validate function defined above
      verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
    })

  server.auth.default('jwt')
})

server.route(ApiRoutes)

var seneca = server.seneca

if (!process.env.TASKS_FRONT_ISOLATED) {
  seneca.use('mesh', {auto: true})
}

seneca.log.info('hapi', server.info)

server.start(endIfError)
