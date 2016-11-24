module.exports = ['$scope', '$location', function ($scope, $location) {
  var oauth2Response = $location.hash();
  var oauth2Params = oauth2Response.split('&');
  var auths = {};
  oauth2Params.forEach(function (e) {
    var params = e.split('=');
    auths[params[0]] = params.splice(1).join('=');
  });
  $scope.auths = auths;
}];
