# hcp-cf-digital-account
The OAuth2 Client project for YaaS service

## Setup

* Exec `npm install`

* Change the login URL of YaaS in file 'src/app/login/login.html'

* Change the cf application name in file 'manifest.yml'

* Run `gulp serve` test the application locally

* Run `gulp` then copy the file 'src/Staticfile' into *dist*

* Push application using `cf push`

* Put the callback url '\<cf-host\>/#/login/callback' in the redirect URIs of the client in YaaS