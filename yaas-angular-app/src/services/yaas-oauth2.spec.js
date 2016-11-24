var angular = require('angular');
require('angular-resource');
require('angular-mocks');
var yaasOAuth2 = require('./yaas-oauth2');

describe('services', function () {
  beforeEach(function () {
    angular
      .module('app', ['ngResource'])
      .factory('YaaSOAuth2', yaasOAuth2);
    angular.mock.module('app');
  });

  it('YaaSOAuth2 has authorize method', angular.mock.inject(function (YaaSOAuth2) {
    expect(typeof YaaSOAuth2.authorize).toBe("function");
  }));
});
