var app = angular.module('myApp', ['ngRoute']);

app.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
});

app.factory('getCallsApi', ['$http', 'Base64', function($http, Base64) {
    return {
        get: function(callback) {
            $http({
                url: //Some REST get call,
                method: "GET",
                withCredentials: true,
                headers: {
                    ''
                    'Content-Type': 'text/plain',
                    'Authorization': 'Basic'
                }
            }).success(function(data) {
                callback(data);
            });
            
        }
    }
}]);

app.controller('appController', ['$scope','getCallsApi', function($scope, getCallsApi) {
  getCallsApi.get(function(data) {
    console.log(data);
  });
}]);
