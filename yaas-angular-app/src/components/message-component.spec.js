var angular = require('angular');
require('angular-mocks');
var messageComponent = require('./message-component');

describe('services', function () {
  beforeEach(function () {
    angular
      .module('app', [])
      .component('messageComponent', messageComponent);
    angular.mock.module('app');
  });

  it('pre content in message-component', angular.mock.inject(function ($rootScope, $compile) {
    var $scope = $rootScope.$new();
    $scope.response = {
      token: '12312312'
    };
    var element = $compile('<message-component message="response"></message-component>')($scope);
    $scope.$digest();
    var pres = element.find('pre');
    var response = angular.fromJson(pres.html().trim());
    expect(response.token).toEqual($scope.response.token);
  }));
});
