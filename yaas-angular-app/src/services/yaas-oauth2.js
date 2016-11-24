module.exports = ['$resource', function ($resource) {
  return $resource('https://api.beta.yaas.io/hybris/oauth2/v1/token', {},
    {
      authorize: {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function (obj) {
          var str = [];
          for (var p in obj) {
            if ({}.hasOwnProperty.call(obj, p)) {
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
          }
          return str.join("&");
        }
      }
    }
  );
}];
