module.exports = ['$scope', 'YaaSOAuth2', function($scope, YaaSOAuth2) {

  var credentials = {
    "grant_type":'password',
    "client_id": '7bTHGrDS9DmuPXPAYbWHOIpV9IzugeUr'
  };

  /**
   * Submit the authorization request when user click "submit" button
   */
  $scope.submit = function(user) {
    credentials.username = user.name;
    credentials.password = user.password;
    $scope.credentials = credentials;
    YaaSOAuth2.authorize(credentials, function(response) {
      $scope.response = response;
    }, function(error) {
      $scope.response = error;
    });
  };

  /**
   * Reset the form input and response when user click "reset" button
   */
  $scope.reset = function() {
    $scope.user = {};
    delete $scope.response;
    delete $scope.credentials;
  };
}];
