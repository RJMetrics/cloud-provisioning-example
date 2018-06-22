const request  = require('request')
const Q        = require('q')
const readline = require('readline-sync')

const config           = require('../config')
const tokens           = require('../endpoints/tokens')
const signups          = require('../endpoints/signups')
const pollSignups      = require('../endpoints/pollSignups')
const createUser       = require('../endpoints/createUser')
const createConnection = require('../endpoints/createConnection')
const pollConnections  = require('../endpoints/pollConnections')
const testConnection   = require('../endpoints/testConnection')
const pollStructSync   = require('../endpoints/pollStructSync')
const startAutodash    = require('../endpoints/startAutodash')
const pollAutodash     = require('../endpoints/pollAutodash')

const finalize = function(job) {
  var deferred = Q.defer()
  console.log("If running on VM run:\n")
  console.log("  > rjmrep.sh "+ job.signupsPollRequestBody.client_id +"\n")
  console.log("or queue a full update on the Admin Panel.")
  deferred.resolve("done!")
  return deferred.promise
}

const requestPollAutodash = function(job) {
  var deferred = Q.defer()

  const makeRequest = function() {
    request(pollAutodash(job), function(err, response, body) {
      if(response.statusCode !== 200 || err) {
        deferred.reject({pollAutodashFailure: body, error: err})
      }
      console.log("Polling Autodash: "+ body.status)
      if(body.status == 'success') {
        console.log("Autodash Complete")
        deferred.resolve(Object.assign(job, {pollAutodashRequestBody: body}))
      } else {
        setTimeout(function() {
          makeRequest()
        }, 3000)
      }
    })
  }

  makeRequest()

  return deferred.promise
}

const requestStartAutodash = function(job) {
  console.log("Starting Autodash")
  var deferred = Q.defer()
  request(startAutodash(job), function(err, response, body) {
    if(response.statusCode !== 201 || err) {
      deferred.reject({startAutodashRequestFailure: body, error: err})
    }
    deferred.resolve(Object.assign(job, {startAutodashRequestBody: body}))
  })
  return deferred.promise
}

const requestPollStructSync = function(job) {
  var deferred = Q.defer()

  const makeRequest = function() {
    request(pollStructSync(job), function(err, response, body) {
      if(response.statusCode !== 200 || err) {
        deferred.reject({pollStructSyncFailure: body, error: err})
      }
      console.log("Polling Struct Sync")
      if(body.length > 0 &&
         body[0].status.name == "Completed Successfully") {
        console.log("Sync Complete")
        deferred.resolve(Object.assign(job, {structSyncPollRequestBody: body}))
      } else {
        setTimeout(function() {
          makeRequest()
        }, 3000)
      }
    })
  }

  makeRequest()

  return deferred.promise
}

const requestTestConnection = function(job) {
  console.log("Testing Connection & Struct Sync")
  var deferred = Q.defer()
  request(testConnection(job), function(err, response, body) {
    if(response.statusCode !== 201 || err) {
      deferred.reject({testConnectionRequestFailure: body, error: err})
    }
    deferred.resolve(Object.assign(job, {testConnectionRequestBody: body}))
  })
  return deferred.promise
}

const requestPollConnection = function(job) {
  var deferred = Q.defer()

  const makeRequest = function() {
    request(pollConnections(job), function(err, response, body) {
      if(response.statusCode !== 200 || err) {
        deferred.reject({pollConnectionsFailure: body, error: err})
      }
      console.log("Polling Connections")
      if(body.length > 0) {
        console.log("Connection Created")
        deferred.resolve(Object.assign(job, {connectionPollRequestBody: body}))
      } else {
        setTimeout(function() {
          makeRequest()
        }, 3000)
      }
    })
  }

  makeRequest()

  return deferred.promise
}

const requestCreateConnection = function(job) {
  console.log("Creating Connection")
  var deferred = Q.defer()
  request(createConnection(job), function(err, response, body) {
    if(response.statusCode !== 201 || err) {
      deferred.reject({createConnectionRequestFailure: body, error: err})
    }
    deferred.resolve(Object.assign(job, {createConnectionRequestBody: body}))
  })
  return deferred.promise
}

const waitForReady = function(job) {
  var deferred = Q.defer()
  const checkReady = function() {
    var ready = readline.question("Type READY and it hit Enter when you received welcome email for Client "+ job.config.newUser.companyName +" ("+ job.signupsPollRequestBody.client_id +"):\n")
    if(ready == 'READY') {
      deferred.resolve(job)
    } else {
      checkReady()
    }
  }
  checkReady()

  return deferred.promise
}

const requestCreateUser = function(job) {
  console.log("Creating User")
  var deferred = Q.defer()
  request(createUser(job), function(err, response, body) {
    if(response.statusCode !== 201 || err) {
      deferred.reject({createUserFailure: body, error: err})
    }
    console.log("Please check your email!")
    deferred.resolve(Object.assign(job, {createUserBody: body}))
  })
  return deferred.promise
}

const requestPollSignups = function(job) {
  var deferred = Q.defer()

  const makeRequest = function() {
    request(pollSignups(job), function(err, response, body) {
      if(response.statusCode !== 200 || err) {
        deferred.reject({pollSignupRequestFailure: body, error: err})
      }
      console.log("Polling Signup: ", body.status)
      if(body.status == 'completed') {
        console.log("Signup Complete")
        deferred.resolve(Object.assign(job, {signupsPollRequestBody: body}))
      } else {
        setTimeout(function() {
          makeRequest()
        }, 3000)
      }
    })
  }

  makeRequest()

  return deferred.promise
}

const requestSignups = function(job) {
  console.log("Creating Signup")
  var deferred = Q.defer()
  request(signups(job), function(err, response, body) {
    if(response.statusCode !== 201 || err) {
      deferred.reject({signupsRequestFailure: body, error: err})
    }
    deferred.resolve(Object.assign(job, {signupsRequestBody: body}))
    console.log("Next step can take some time, can check /backup/logs/replication.log on Dataserver for status")
  })
  return deferred.promise
}

const requestTokens = function(job) {
  console.log("Creating Token")
  var deferred = Q.defer()
  request(tokens(job), function(err, response, body) {
    if(response.statusCode !== 201 || err) {
      deferred.reject({tokenRequestFailure: body, error: err})
    }
    deferred.resolve(Object.assign(job, {tokenRequestBody: body}))
  })

  return deferred.promise
}

const run = requestTokens({config: config})
  .then(requestSignups)
  .then(requestPollSignups)
  .then(requestCreateUser)
  .then(waitForReady)
  .then(requestCreateConnection)
  .then(requestPollConnection)
  .then(requestTestConnection)
  .then(requestPollStructSync)
  .then(requestStartAutodash)
  .then(requestPollAutodash)
  .then(finalize)

run.then(console.log, console.error)
