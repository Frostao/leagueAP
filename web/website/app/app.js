var app = angular.module('leagueApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
         .when('/', {
            templateUrl : 'js/src/splash/splash-tmpl.html',
            controller  : 'splashController'
        })
        .when('/author', {
            templateUrl : 'js/src/authors/authors-tmpl.html',
            controller  : 'authorsController'
        })
        .when('/compare', {
            templateUrl : 'js/src/compare/compare-tmpl.html',
            controller : 'compareController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.controller('compareController', ['$scope', '$http', function($scope, $http) {
    $scope.allData = []
    $scope.allChampions = {}
    
    // create a message to display in our view
    $scope.getAllLeagueAPData = function() {
        /*$http.get('http://ddragon.leagueoflegends.com/cdn/5.2.1/data/en_US/champion.json').
          then(function(response) {
            $scope.allChampions = response.data.data;
            console.log($scope.allChampions);
          }, function(response) {
            console.log(response.data);
          });

        for (var i = 0; i< 10; i++) {
            console.log(i);
        }*/
        $http.get('http://localhost:7001/api/all').
          then(function(response) {

            $scope.allData = response.data;
            console.log($scope.allData);
          }, function(response) {
            console.log(response.data);
          });
    }
    $scope.getAllLeagueAPData();
}]);

app.controller('authorsController', function($scope) {

});

app.controller('splashController', function($scope) {

});