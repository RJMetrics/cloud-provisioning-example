const commander = require('commander')

var newUser
var connectionName
var adminEmail
var apiHost
var dashboardHost

commander.arguments('<newUserEmail> <companyName> <adminEmail>')
  .option('-p, --prod')
  .action(function (email, companyName, admin_email) {
    newUser = {
      email: email,
      firstName: "First Name",
      lastName: "Last Name",
      companyName: companyName,
    }
    adminEmail = admin_email
    connectionName = "New Connection"
  })
  .on('--help', function() {
    console.log("\n\nHello, welcome to the help for the cloud onboarding demo tool!")
    console.log("If on your VM make sure you have an OAUTH Client for use with Cloud Onboarding:\n")
    console.log('  > INSERT INTO rjmadmin.oauth_clients (name, secret, description, client_credentials_grant_allowed, password_grant_allowed) VALUES ("cloud onboarding", "abc123def456ghi789jkl", "For allowing cloud onboarding", 1, 1);\n')
    console.log("Make sure you can run struct-syncs:\n")
    console.log("  > sudo chmod 777 /var/run/rjm\n")
    console.log("To run the tool, use the following command:\n")
    console.log("  > npm run go you@email.com (this is the user email that will be created) 'Company Name' blackhole+admin@rjmetrics.com (or other full admin account)\n")
    console.log("In addition you must have the following ENV variables set in your shell:\n")
    console.log("\tCLOUD_ONBOARDING_CLIENT_SECRET\n\tCLOUD_ONBOARDING_CONNECTION_PASSWORD\n\tCLOUD_ONBOARDING_CONNECTION_HOST\n\tCLOUD_ONBOARDING_ADMIN_PASSWORD\n")
    console.log("For example: \n")
    console.log("  > export CLOUD_ONBOARDING_CLIENT_SECRET=abc123def456ghi789jkl (the key from above!)\n")
    console.log("")
  })
  .parse(process.argv)

clientSecret       = process.env.CLOUD_ONBOARDING_CLIENT_SECRET
connectionPassword = process.env.CLOUD_ONBOARDING_CONNECTION_PASSWORD
connectionHost     = process.env.CLOUD_ONBOARDING_CONNECTION_HOST
adminPassword      = process.env.CLOUD_ONBOARDING_ADMIN_PASSWORD

if(newUser            == null ||
   clientSecret       == null ||
   connectionPassword == null ||
   adminPassword      == null ||
   connectionHost     == null) {
  console.log("****************")
  console.log("***   ISSUE  ***")
  console.log("****************\n")
  console.log('Missing arguments or ENV variables! Run:\n')
  console.log('  > npm run help\n')
  console.log("For usage instructions\n")
  process.exit(1)
}

if(commander.prod) {
  console.log("running production")
  apiHost = "https://api.rjmetrics.com"
  dashboardHost = "https://dashboard.rjmetrics.com"
} else {
  console.log("running vm")
  apiHost = 'http://api.localhost.test:5000',
  dashboardHost = 'http://dashboard.localhost.test:5000'
}

const config = {
  newUser: newUser,
  connection: {
    password: connectionPassword,
    host: connectionHost,
    name: connectionName
  },
  connectionName: connectionName,
  api: apiHost,
  dashboard: dashboardHost,
  clientSecret: clientSecret,
  adminPassword: adminPassword,
  adminEmail: adminEmail
};


module.exports = config
