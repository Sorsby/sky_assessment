'use strict';

angular.module('moodsliderApp.home', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'home/home_view.html',
      controller: 'HomeCtrl'
    });
  }])

  .controller('HomeCtrl', ['$http', '$scope', 'myProgrammeDataService', function ($http, $scope, myProgrammeDataService) {

    var defaultMoodsFile = "../data/default_moods.json";
    var defaultProgrammesFile = "../data/default_programmes.json";

    $scope.moods = {};
    $scope.moodMin = -5;
    $scope.moodMax = 5;

    var programmes = {};

    //TODO: Not sure if this is the best way to handle this,
    //Opted to store default settings in JSON files instead of hardcoding in this controller.
    //Would investigate better options if I had more time.
    var setupMoodSliders = function () {
      $http.get(defaultMoodsFile).success(function (data) {
        var scores = calculateMoodScores(data);
        updateRecommendedProgrammes(scores);
        $scope.moods = data;
      }).error(function (data, status) {
        console.log("Error: No mood data available, check moods.json is complete and correct!");
      });
    };

    //Same as above.
    programmes = myProgrammeDataService.getJson();
    if (!programmes) {
      $http.get(defaultProgrammesFile).success(function (data) {
        programmes = data;
        $scope.recommendedProgrammes = programmes;
      }).error(function (data, status) {
        console.log("Error: No programme data available, check programme.json is complete and correct!");
      });
    }
    setupMoodSliders();

    $scope.sliderCallback = function ($event, value) {
      var scores = calculateMoodScores($scope.moods);
      updateRecommendedProgrammes(scores);
    };

    //TODO: Factor out into the recommendation service.
    var calculateMoodScores = function (data) {
      var moodScores = {};
      for (var key in data) {
        var mood = data[key];
        if (mood.sliderValue < 0) {
          moodScores[mood.min] = Math.abs(mood.sliderValue);
          continue;
        }
        moodScores[mood.max] = Math.abs(mood.sliderValue);
      }
      return moodScores;
    };

    //TODO: Factor out into a service.
    var fetchProgrammeRecommendations = function (scores) {
      var recommendations = [];

      //TODO: improve the recommendation code.
      for (var score in scores) {
        for (var programme in programmes) {
          if (score == programmes[programme].mood) {
            recommendations.push(programmes[programme]);
          }
        }
      }
      return recommendations;
    };

    var updateRecommendedProgrammes = function(moodScores) {
      $scope.recommendedProgrammes = fetchProgrammeRecommendations(moodScores);
    };

    // //TODO: Factor out in some utility file.
    // var getRandomInt = function (min, max) {
    //   min = Math.ceil(min);
    //   max = Math.floor(max);
    //   return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    // };
  }]);