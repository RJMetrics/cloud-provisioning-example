const requestOptions = function(job) {
  return {
    url: job.config.dashboard + "/v2/client/" + job.signupsPollRequestBody.client_id +"/job/type/5",
    headers: {
      'Content-Type': 'application/json',
      Cookie: 'dashuid='+ job.tokenRequestBody.user_id +'; DASHSESS2='+ job.tokenRequestBody.access_token +'',
      Accept: 'application/json, text/plain, */*',
    },
    method: 'GET',
    json: true
  }
}

module.exports = requestOptions

