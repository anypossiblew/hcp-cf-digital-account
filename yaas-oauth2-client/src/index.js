var angular = require('angular');
require('angular-route');
require('angular-resource');

var yaasOAuth2 = require('./services/yaas-oauth2');
var navigation = require('./app/navigation');
var implicitGrant = require('./app/login/implicit-grant');
var implicitCallback = require('./app/login/callback');
var clientCredentials = require('./app/login/client-credentials');
var passwordCredentials = require('./app/login/password-credentials');


require('./index.css');

var app = 'app';
module.exports = app;

angular
  .module(app, ['ngRoute', 'ngResource'])
  .factory('YaaSOAuth2', yaasOAuth2)
  .controller('NavigationController', navigation)
  .controller('ImplicitGrantController', implicitGrant)
  .controller('ImplicitCallbackController', implicitCallback)
  .controller('ClientCredentialsController', clientCredentials)
  .controller('PasswordCredentialsController', passwordCredentials)

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        template: require('./app/navigation.html'),
        controller: 'NavigationController as navigation'
      })
     .when('/implicit-grant', {
        template: require('./app/login/implicit-grant.html'),
        controller: 'ImplicitGrantController as implicitGrant'
      })
      .when('/implicit-grant/callback', {
        template: require('./app/login/callback.html'),
        controller: 'ImplicitCallbackController as implicitCallback'
      })
      .when('/client-credentials', {
        template: require('./app/login/client-credentials.html'),
        controller: 'ClientCredentialsController as clientCredentials'
      })
      .when('/password-credentials', {
        template: require('./app/login/password-credentials.html'),
        controller: 'PasswordCredentialsController as passwordCredentials'
      });

    //$locationProvider.html5Mode(true);
  }]);
