const requestOptions = function(job) {
  return {
    url: job.config.api + "/v1/v2/clients/" + job.signupsPollRequestBody.client_id +"/connections/input-connections",
    headers: {
      Authorization: 'Bearer ' + job.tokenRequestBody.access_token,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    json: true,
    body: {

    credentials: {
        encryption_password: null,
        password: job.config.connection.password
    },
    display_name: job.config.connection.name,
    name: job.config.connection.name,
    properties: {
      dbName: "magento_store",
      desiredTZ: null,
      encryption_gatewayAddress: null,
      encryption_groupName: null,
      encryption_groupSecret: null,
      encryption_sshHostAddress: null,
      encryption_sshPort: null,
      encryption_sshUsername: null,
      encryption_type: "none",
      encryption_username: null,
      host: job.config.connection.host,
      noPhpPasswordEncryption: "1",
      port: "3306",
      sourceTZ: "UTC",
      status: "1",
      useSSL: "false",
      username: "magento"},
    type: "mysql"
    }
  }
}

module.exports = requestOptions
