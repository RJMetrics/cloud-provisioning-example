const requestOptions = function(job) {
  return {
    url: job.config.api + "/v3/invites",
    headers: {
      Authorization: 'Bearer ' + job.tokenRequestBody.access_token,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    json: true,
    body: {
      force_create: 1,
      email: job.config.newUser.email,
      client_id: job.signupsPollRequestBody.client_id,
      client_rights: {
        admin: 1,
        billing: 1,
        readonly: 1,
        technical: 1
      },
      first_name: job.config.newUser.firstName,
      last_name: job.config.newUser.lastName
    }
  }
}

module.exports = requestOptions
