var angular = require('angular');
require('angular-mocks');
var Navigation = require('./navigation');

describe('navigation', function () {
  beforeEach(function () {
    angular
      .module('app', [])
      .controller('NavigationController', Navigation);
    angular.mock.module('app');
  });

  it('show the navigations in index', angular.mock.inject(function ($controller) {
    var $scope = {};
    $controller('NavigationController', {$scope: $scope});
    expect($scope.navigations.length).toEqual(3);
  }));
});
