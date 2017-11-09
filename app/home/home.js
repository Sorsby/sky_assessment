'use strict';

angular.module('moodsliderApp.home', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'home/home_view.html',
      controller: 'HomeCtrl'
    });
  }])

  .controller('HomeCtrl', ['$http', '$scope', 'myProgrammeDataService', function ($http, $scope, myProgrammeDataService) {

    $scope.programmes = myProgrammeDataService.getJson();
    console.log($scope.programmes);
    if (!$scope.programmes) {
      $http.get('../data/programmes.json').success(function (data) {
        $scope.programmes = data;
      }).error(function (data, status) {
        console.log("Error: No programme data available, check moods.json is complete and correct!");
      });
    }

    $http.get('../data/moods.json').success(function (data) {
      $scope.moods = data;
    }).error(function (data, status) {
      console.log("Error: No mood data available, check moods.json is complete and correct!");
    });

    $scope.moodMin = 0;
    $scope.moodMax = 10;

  }]);