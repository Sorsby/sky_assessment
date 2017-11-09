'use strict';

angular.module('moodsliderApp.home', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'home/home_view.html',
      controller: 'HomeCtrl'
    });
  }])

  .controller('HomeCtrl', ['$http', '$scope', function ($http, $scope) {

    $scope.moodMin = 0;
    $scope.moodMax = 10;

    $http.get('../data/moods.json').success(function(data) {
      $scope.moods = data;
      console.log($scope.moods);
    }).error(function(data, status) {
      console.log("Error: No mood data available, check moods.json is complete and correct!");
    });

    //TODO: factor out into provider/service.
    //should ideally be constructed as and when the sliders are changed with new recommendatiosn from uploaded data.
    $scope.programmes = {
      '1': {
        'title': 'No Content',
        'image_path': 'No Content'
      },
      '2': {
        'title': 'No Content',
        'image_path': 'No Content'
      },
      '3': {
        'title': 'No Content',
        'image_path': 'No Content'
      },
      '4': {
        'title': 'No Content',
        'image_path': 'No Content'
      },
      '5': {
        'title': 'No Content',
        'image_path': 'No Content'
      }
    }

  }]);