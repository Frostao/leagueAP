(function () {
'use strict';
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
    'use strict';
    /*var ChampionData = {
        name : null,
        image: null,
        id : 0,
        freq : 0,
        wins : 0,
        kills : 0,
        deaths : 0,
        items : []
    }*/
    function ChampionData () {
        this.name = null;
        this.image = null;
        this.id = 0;
        this.freq = 0;
        this.wins = 0;
        this.kills = 0;
        this.deaths = 0;
        this.items = [];
    }
    $scope.allData = []
    $scope.allChampions = {}

    // create a message to display in our view
    $scope.getAllLeagueAPData = function() {
        $http.get('http://ddragon.leagueoflegends.com/cdn/5.2.1/data/en_US/champion.json').
          then(function(response) {
            $scope.allChampions = angular.fromJson(response.data.data);
            angular.forEach($scope.allChampions, function(item){
                var champ = new ChampionData();
                champ.name = item.id;
                champ.image = "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/"+item.id+".png";
                $http.get('http://localhost:7001/api/champion/id/'+item.key).
                  then(function(response) {
                    champ.id = response.data.id;
                    champ.freq = response.data.freq;
                    champ.wins = response.data.wins;
                    champ.kills = response.data.kills;
                    champ.deaths = response.data.deaths;
                    champ.items = response.data.items;
                    $scope.allData.push(champ);
                  }, function(response) {
                    console.log(response.data);
                  }); 
            })
          }, function(response) {
            console.log(response.data);
          });    
    }
    $scope.getAllLeagueAPData();
}]);
//http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/Aatrox.png
app.controller('authorsController', function($scope) {

});

app.controller('splashController', function($scope) {

});
})();