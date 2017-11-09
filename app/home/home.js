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
        var scores = calculateMoodScores($scope.moods);
        updateRecommendedProgrammes(scores)
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
      var moodRankings = [];
      var totalMoodScore = 0;

      //loop through array of mood names and keep track of the highest slider value,
      //save the mood name of the highest value to a ranking array for providing recommendations later.
      var moodsToProcess = Object.keys(scores);
      while (moodsToProcess.length != 0) {
        var currentHighest = moodsToProcess[0];
        for (var mood in scores) {
          totalMoodScore = totalMoodScore + scores[mood];
          if (scores[mood] > scores[currentHighest]) {
            currentHighest = mood;
          }
        }

        if (!isInArray(currentHighest, moodRankings) && totalMoodScore > 0) {
          moodRankings.push(currentHighest);
        }
        //remove from the processing array.
        moodsToProcess.splice(moodsToProcess.indexOf(currentHighest), 1);
      }

      console.log(moodRankings);
      //if no slider input, show all programmes
      if (moodRankings.length == 0){
        recommendations = programmes;
      }

      //use given rankings to display relevant programmes
      for (var mood in moodRankings) {
        for (var programme in programmes) {
          if (moodRankings[mood] == programmes[programme].mood) {
            recommendations.push(programmes[programme]);
          }
        }
      }
      console.log(recommendations);
      return recommendations;
    };

    var updateRecommendedProgrammes = function (moodScores) {
      $scope.recommendedProgrammes = fetchProgrammeRecommendations(moodScores);
    };

    //TODO: Factor out into some util file.
    var isInArray = function (value, array) {
      return array.indexOf(value) > -1;
    }

    // //TODO: Factor out in some utility file.
    // var getRandomInt = function (min, max) {
    //   min = Math.ceil(min);
    //   max = Math.floor(max);
    //   return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    // };
  }]);