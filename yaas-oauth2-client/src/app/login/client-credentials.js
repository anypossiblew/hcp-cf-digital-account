module.exports = ['$scope', 'YaaSOAuth2', function($scope, YaaSOAuth2) {

  var credentials = {
    "grant_type":'client_credentials',
    "client_id": '7bTHGrDS9DmuPXPAYbWHOIpV9IzugeUr',
    "client_secret": 'H2LYBpaNVDwk9E5A'
  };
  
  YaaSOAuth2.authorize(credentials, function(response) {
    $scope.credentials = credentials;
    $scope.response = response;
  });

}];
