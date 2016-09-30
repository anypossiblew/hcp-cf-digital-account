'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let cfenv = require('cfenv');

// create express instance
let oApp = express();

// Cloud Foundry environment variables
let oAppEnv = cfenv.getAppEnv();

// body parser middleware to handle URL parameter and JSON bodies
oApp.use(bodyParser.urlencoded({extended: false}));
oApp.use(bodyParser.json());

// connect to mongodb
require('./server/db/mongo-connect.js')(oAppEnv);

// api
require('./server/api/info/info.js')(oApp, oAppEnv);
require('./server/api/messages/messages.js')(oApp);

// express app listener
oApp.listen(oAppEnv.port, function(){
    console.log('Server listening at ' + oAppEnv.url);
});

