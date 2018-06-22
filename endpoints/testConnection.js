const requestOptions = function(job) {
  return {
    url: job.config.dashboard + "/v2/client/" + job.signupsPollRequestBody.client_id +"/job",
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:60.0) Gecko/20100101 Firefox/60.0',
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: 'dashuid='+ job.tokenRequestBody.user_id +'; DASHSESS2='+ job.tokenRequestBody.access_token +'',
      Accept: 'application/json, text/plain, */*',
      Referer: job.config.dashboard +'/v2/client/'+ job.signupsPollRequestBody.client_id +'/dashapp/settings/connection/'+ job.connectionPollRequestBody[0].meta_id +'/'
    },
    form: {
      jobType: 27,
      'workload[connectionId]': job.connectionPollRequestBody[0].meta_id,
      'workload[syncAndSample]': 1
    },
    method: 'POST',
    json: true
  }
}

module.exports = requestOptions
