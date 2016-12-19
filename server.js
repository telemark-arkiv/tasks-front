'use strict'

const PORT = process.env.TASKS_FRONT_PORT || 8000

// Our hapi server bits
const Chairo = require('chairo')
const Hapi = require('hapi')
const legacyLogger = require('seneca-legacy-logger')
const senecaConfig = {internal: {logger: legacyLogger}}
const Seneca = require('seneca')(senecaConfig)
const hapiAuthJwt2 = require('hapi-auth-jwt2')
const Good = require('good')
const validateAPI = require('./lib/validate-api')
const config = require('./config')

const goodOptions = {
  ops: {
    interval: 10000
  },
  reporters: {
    console: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ 'log': '*', 'ops': '*', 'error': '*', 'response': '*' }]
    }, {
      module: 'good-console'
    }, 'stdout']
  }
}

// Our server routes
const ApiRoutes = require('./routes/api')

function endIfError (error) {
  if (error) {
    console.error(error)
    process.exit(1)
  }
}

const server = new Hapi.Server()
server.connection({port: PORT})

const plugins = [
  {register: Chairo, options: {seneca: Seneca}},
  {register: Good, options: goodOptions},
  {register: hapiAuthJwt2}
]

server.register(plugins, (error) => {
  endIfError(error)

  server.auth.strategy('jwt', 'jwt',
    { key: config.JWT_SECRET,          // Never Share your secret key
      validateFunc: validateAPI,            // validate function defined above
      verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
    })

  server.auth.default('jwt')

  server.route(ApiRoutes)
})

const seneca = server.seneca

if (!process.env.TASKS_FRONT_ISOLATED) {
  seneca.use('mesh', {auto: true})
}

seneca.log.info('hapi', server.info)

server.start(endIfError)
