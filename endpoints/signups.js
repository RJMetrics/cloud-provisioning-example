const requestOptions = function(job) {
  return {
    url: job.config.api + "/v3/signups",
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    json: true,
    body: {
      tier: 'T100',
      company: job.config.newUser.companyName,
      first_name: job.config.newUser.firstName,
      last_name: job.config.newUser.lastName,
      email: job.config.adminEmail,
      role: 'csm',
      magento: {
        customer_id: "MAG0000001",
        subscription_id: "1000"
      }
    }
  }
}

module.exports = requestOptions
