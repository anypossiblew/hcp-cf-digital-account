var angular = require('angular');
require('angular-route');

var login = require('./app/login/login');
var oauthCallback = require('./app/login/callback');

require('./index.css');

var app = 'app';
module.exports = app;

angular
  .module(app, ['ngRoute'])
  .controller('LoginController', login)
  .controller('OAuthCallbackController', oauthCallback)
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
     .when('/login', {
      template: require('./app/login/login.html'),
      controller: 'LoginController as loginCtrl'
    })
    .when('/login/callback', {
      template: require('./app/login/callback.html'),
      controller: 'OAuthCallbackController as oauthCallback'
    });

    // configure html5 to get links working on jsfiddle
    //$locationProvider.html5Mode(true);
  }]);
