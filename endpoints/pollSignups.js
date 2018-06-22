const requestOptions = function(job) {
  return {
    url: job.config.api + "/v3/signups/" + job.signupsRequestBody.id,
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
    json: true,
  }
}

module.exports = requestOptions
