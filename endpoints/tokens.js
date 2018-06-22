const requestOptions = function(job) {
  return {
    url: job.config.api + "/v1/tokens",
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    json: true,
    body: {
      password: job.config.adminPassword,
      scope: 'default',
      username: job.config.adminEmail,
      grant_type: 'password',
      clientId: 18,
      clientSecret: job.config.clientSecret
    }
  }
}

module.exports = requestOptions
