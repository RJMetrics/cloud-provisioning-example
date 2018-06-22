const requestOptions = function(job) {
  return {
    url: job.config.api + "/v1/clients/"+ job.signupsPollRequestBody.client_id  +"/autodash",
    headers: {
      'Content-Type': 'application/json',
      Cookie: 'DASHSESS2='+ job.tokenRequestBody.access_token,
    },
    method: 'POST',
    json: true,
    body: {
      connections: {
        db: {
            connection_id: job.connectionPollRequestBody[0].meta_id,
            database: "magento_store",
            table_prefix: ""
        }
      },
      package: "magento1_rjql1",
      user_id: job.createUserBody.user_id
    }
  }
}

module.exports = requestOptions
