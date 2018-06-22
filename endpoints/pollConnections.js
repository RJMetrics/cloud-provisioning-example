const requestOptions = function(job) {
  return {
    url: job.config.api + "/v1/v2/clients/" + job.signupsPollRequestBody.client_id +"/connections/input-connections?include_deleted=false",
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + job.tokenRequestBody.access_token
    },
    method: 'GET',
    json: true
  }
}

module.exports = requestOptions
