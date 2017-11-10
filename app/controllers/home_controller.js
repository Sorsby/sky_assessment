'use strict';

angular.module('moodsliderApp')
  .controller('HomeCtrl', ['$http', '$scope', 'programmeService', 'moodService', 'recommendationService',
    function ($http, $scope, programmeService, moodService, recommendationService) {

      var defaultMoodsFile = "../data/default_moods.json";

      $scope.moods = {};
      $scope.moodMin = -5;
      $scope.moodMax = 5;

      var programmes = {};

      moodService.setupMoodSliders(function (moodData) {
        $scope.moods = moodData;
        updateRecommendedProgrammes($scope.moods, programmes)
      });

      var setupMoodSliders = function () {
        $http.get(defaultMoodsFile).success(function (moodData) {
          updateRecommendedProgrammes(moodData, programmes)
          $scope.moods = moodData;
        }).error(function (data, status) {
          console.log("Error: No mood data available, check moods.json is complete and correct!");
        });
      };
      setupMoodSliders();

      var updateRecommendedProgrammes = function (moodData, programmeData) {
        $scope.recommendedProgrammes = recommendationService.getProgrammeRecommendations(moodData, programmeData);
      };

      /**
       * Setup the programme recommendations with
       * respect to available data.
       */
      //Instead of callbacks here I would probably opt to use promises but I didn't have time to 
      //make the change.
      programmeService.getProgrammes(function (programmeData) {
        programmes = programmeData;
        updateRecommendedProgrammes($scope.moods, programmes);
      }, function (defaultProgrammeData) {
        programmes = defaultProgrammeData;
        updateRecommendedProgrammes($scope.moods, programmes);
      });

      /**
       * Callback function for slider onstop event.
       * @param {*}  
       * @param {*} value 
       */
      $scope.sliderCallback = function ($event, value) {
        var moodData = $scope.moods;
        updateRecommendedProgrammes(moodData, programmes);
      };
    }
  ]);