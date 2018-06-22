# cloud-provisioning-example

Example script for provisioning new MBI clients via the API

## Installation

Tested with:

Node v7.2.0

npm  3.10.9

```
npm install
```

## Help

```
npm run help
```

## Running

`npm run help` will tell you you need the following ENV variables set:

	CLOUD_ONBOARDING_CLIENT_SECRET
	CLOUD_ONBOARDING_CONNECTION_PASSWORD
	CLOUD_ONBOARDING_CONNECTION_HOST
	CLOUD_ONBOARDING_ADMIN_PASSWORD
  
Run with:

```
npm run prod|vm <new user email> <new company name> <your MBI email address>
```
