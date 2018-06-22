const requestOptions = function(job) {
  return {
    url: job.config.api + "/v1/clients/" + job.signupsPollRequestBody.client_id + "/autodash/" + job.startAutodashRequestBody.id,
    headers: {
      'Content-Type': 'application/json',
      Cookie: 'DASHSESS2='+ job.tokenRequestBody.access_token
    },
    method: 'GET',
    json: true,
  }
}

module.exports = requestOptions

