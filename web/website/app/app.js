(function () {
'use strict';
var app = angular.module('leagueApp', ['ngRoute', 'ngProgress']);

app.config(function($routeProvider) {
    $routeProvider
         .when('/', {
            templateUrl : 'js/src/compare/compare-tmpl.html',
            controller  : 'compareController'
        })
        .when('/about', {
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

app.controller('compareController', ['$scope', '$http', '$filter', '$window', '$rootScope', 'ngProgressFactory',function($scope, $http, $filter, $window, $rootScope, ngProgressFactory) {
    'use strict';
    var orderBy = $filter('orderBy');
    $rootScope.region = "Select Region"
    $rootScope.regioncode = "NA";
    $rootScope.order = "R";
    $scope.progressbar = ngProgressFactory.createInstance();
    $scope.progressbar.setParent(document.getElementById('progress'));
    $scope.progressbar.setColor('#FFFFFF');
    $scope.progressbar.setHeight('5px');

    $scope.currentChampionData = {
        name : null,
        realName : null,
        image: null,
        id : 0,
        freq : 0,
        winrate : 0,
        averagekills : 0,
        averagedeaths : 0,
        items : [],
        freq_2 : 0,
        winrate_2 : 0,
        averagekills_2 : 0,
        averagedeaths_2 : 0,
        items_2 : [],
        apiVersion: 0,
        apiVersion_2: 0
    }
    function ChampionData () {
        this.name = null;
        this.realName = null;
        this.image = null;
        this.id = 0;
        this.freq = 0;
        this.winrate = 0;
        this.averagekills = 0;
        this.averagedeaths = 0;
        this.items = [];
        this.apiVersion = 0;
    }
    $scope.allData = []
    $scope.allData514 = []
    $scope.allChampions = {}

    $scope.getChampionData = function(item) {
        $scope.currentChampionData.name = item.name;
        $scope.currentChampionData.realName = item.realName;
        $scope.currentChampionData.image = item.image;
        $scope.currentChampionData.id = item.id;
        $scope.currentChampionData.freq = item.freq;
        $scope.currentChampionData.winrate = item.winrate;
        $scope.currentChampionData.averagekills = item.averagekills;
        $scope.currentChampionData.averagedeaths = item.averagedeaths;
        $scope.currentChampionData.items = item.items;
        $scope.currentChampionData.apiVersion = item.apiVersion;
        if(item.apiVersion == 5.11) {
            $scope.currentChampionData.apiVersion_2 = 5.14
        } else if(item.apiVersion == 5.14) {
            $scope.currentChampionData.apiVersion_2 = 5.11
        }
        $http.get('http://128.211.242.21:7001/api/'+$rootScope.regioncode+$scope.currentChampionData.apiVersion_2+$rootScope.order+'/champion/id/'+item.id).
          then(function(response) {
            if(!(response.data === "Not Found")) {
                $scope.currentChampionData.freq_2 = response.data.freq;
                $scope.currentChampionData.winrate_2 = ((response.data.wins*100)/response.data.freq).toFixed(2);
                $scope.currentChampionData.averagekills_2 = (response.data.kills/response.data.freq).toFixed(1);
                $scope.currentChampionData.averagedeaths_2 = (response.data.deaths/response.data.freq).toFixed(1);
                $scope.currentChampionData.items_2 = response.data.items;
            } else {
                $scope.currentChampionData.freq_2 = "Not Available";
                $scope.currentChampionData.winrate_2 = "Not Available";
                $scope.currentChampionData.averagekills_2 = "Not Available";
                $scope.currentChampionData.averagedeaths_2 = "Not Available";
                $scope.currentChampionData.items_2 = null;
            }
          }, function(response) {
            console.log(response.data);
          });  
    }

    // create a message to display in our view
    $scope.getAllLeagueAPData = function() {
        $scope.progressbar.start();
        $http.get('http://ddragon.leagueoflegends.com/cdn/5.16.1/data/en_US/champion.json').
          then(function(response) {
            $scope.allChampions = angular.fromJson(response.data.data);
            angular.forEach($scope.allChampions, function(item){
                var champ = new ChampionData();
                champ.apiVersion = 5.11;
                champ.realName = item.id;
                champ.name = item.id;
                if (champ.name == "MonkeyKing") {
                    champ.name = "Wu Kong";
                } else if (champ.name == "Chogath") {
                    champ.name = "Cho'Gath";
                } else if (champ.name == "DrMundo") {
                    champ.name = "Dr Mundo";
                } else if (champ.name == "JarvanIV") {
                    champ.name = "Jarvan IV";
                } else if (champ.name == "Khazix") {
                    champ.name = "Kha'Zix";
                } else if (champ.name == "KogMaw") {
                    champ.name = "Kog'Maw";
                } else if (champ.name == "LeeSin") {
                    champ.name = "Lee Sin";
                } else if (champ.name == "MasterYi") {
                    champ.name = "Master Yi";
                } else if (champ.name == "MissFortune") {
                    champ.name = "Miss Fortune";
                } else if (champ.name == "RekSai") {
                    champ.name = "Rek'Sai";
                } else if (champ.name == "TahmKench") {
                    champ.name = "Tahm Kench";
                } else if (champ.name == "TwistedFate") {
                    champ.name = "Twisted Fate";
                } else if (champ.name == "Velkoz") {
                    champ.name = "Vel'Koz";
                } else if (champ.name == "XinZhao") {
                    champ.name = "Xin Zhao";
                }


                champ.image = "http://ddragon.leagueoflegends.com/cdn/5.16.1/img/champion/"+item.id+".png";
                $http.get('http://128.211.242.21:7001/api/'+$rootScope.regioncode+'5.11'+$rootScope.order+'/champion/id/'+item.key).

                  then(function(response) {
                    champ.id = item.key;
                    if(!(response.data === "Not Found")) {
                        
                        champ.freq = response.data.freq;
                        champ.winrate = ((response.data.wins*100)/response.data.freq).toFixed(2);
                        champ.averagekills = (response.data.kills/response.data.freq).toFixed(1);
                        champ.averagedeaths = (response.data.deaths/response.data.freq).toFixed(1);
                        champ.items = response.data.items;
                        $scope.allData.push(champ);
                    } else {
                        console.log("mylog "+item.id);
                        champ.freq = "Not Available";
                        champ.winrate = "Not Available";
                        champ.averagedeaths = "Not Available";
                        champ.averagekills = "Not Available";
                        champ.items = null;
                        $scope.allData.push(champ);
                    }
                  }, function(response) {
                    console.log(response.data);
                  }); 

                $scope.progressbar.stop();
                var champ514 = new ChampionData();
                champ514.apiVersion = 5.14;
                champ514.realName = item.id;
                champ514.name = item.id;
                if (champ514.name == "MonkeyKing") {
                    champ514.name = "Wu Kong";
                } else if (champ514.name == "Chogath") {
                    champ514.name = "Cho'Gath";
                } else if (champ514.name == "DrMundo") {
                    champ514.name = "Dr Mundo";
                } else if (champ514.name == "JarvanIV") {
                    champ514.name = "Jarvan IV";
                } else if (champ514.name == "Khazix") {
                    champ514.name = "Kha'Zix";
                } else if (champ514.name == "KogMaw") {
                    champ514.name = "Kog'Maw";
                } else if (champ514.name == "LeeSin") {
                    champ514.name = "Lee Sin";
                } else if (champ514.name == "MasterYi") {
                    champ514.name = "Master Yi";
                } else if (champ514.name == "MissFortune") {
                    champ514.name = "Miss Fortune";
                } else if (champ514.name == "RekSai") {
                    champ514.name = "Rek'Sai";
                } else if (champ514.name == "TahmKench") {
                    champ514.name = "Tahm Kench";
                } else if (champ514.name == "TwistedFate") {
                    champ514.name = "Twisted Fate";
                } else if (champ514.name == "Velkoz") {
                    champ514.name = "Vel'Koz";
                } else if (champ514.name == "XinZhao") {
                    champ514.name = "Xin Zhao";
                }
                champ514.image = "http://ddragon.leagueoflegends.com/cdn/5.16.1/img/champion/"+item.id+".png";
                $http.get('http://128.211.242.21:7001/api/'+$rootScope.regioncode+'5.14'+$rootScope.order+'/champion/id/'+item.key).
                  then(function(response) {
                    champ514.id = item.key;
                    if(!(response.data === "Not Found")) {
                        
                        champ514.freq = response.data.freq;
                        champ514.winrate = ((response.data.wins*100)/response.data.freq).toFixed(2);
                        champ514.averagekills = (response.data.kills/response.data.freq).toFixed(1);
                        champ514.averagedeaths = (response.data.deaths/response.data.freq).toFixed(1);
                        champ514.items = response.data.items;
                        $scope.allData514.push(champ514);
                    } else {
                        champ514.freq = "Not Available";
                        champ514.winrate = "Not Available";
                        champ514.averagedeaths = "Not Available";
                        champ514.averagekills = "Not Available";
                        champ514.items = null;
                        $scope.allData514.push(champ514);
                    }
                  }, function(response) {
                    console.log(response.data);
                  }); 
            })
          }, function(response) {
            console.log(response.data);
          }); 
          $scope.progressbar.complete();  
    }
    $scope.sortAllData = function() {
        $scope.allData.sort(function(a, b) { 
            return a.name.toUpperCase().localeCompare(b.name.toUpperCase());
        })
        $(window).load(function(){
            $scope.order('name',false);
        });
    }

    $scope.sortAllData514 = function() {
        $scope.allData514.sort(function(a, b) { 
            return a.name.toUpperCase().localeCompare(b.name.toUpperCase());
        })
        $(window).load(function(){
            $scope.order514('name',false);
        });
    }

    $scope.order = function(predicate, reverse) {
        $scope.allData = orderBy($scope.allData, predicate, reverse);
    };

    $scope.order514 = function(predicate, reverse) {
        $scope.allData514 = orderBy($scope.allData514, predicate, reverse);
    };

    $scope.changeRegion = function(region, regioncode, order) {
        $rootScope.region = region;
        $rootScope.regioncode = regioncode;
        $rootScope.order = order;
        $scope.allData = []
        $scope.allData514 = []
        $scope.getAllLeagueAPData();
    }

}]);
//http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/Aatrox.png
app.controller('authorsController', function($scope) {

});

})();