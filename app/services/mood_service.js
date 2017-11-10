'use strict';

angular.module('moodsliderApp')
    .factory('moodService', function ($http) {
        var moodJson = null;
        var defaultMoodsFile = "../data/default_moods.json";

        return {
            setupMoodSliders: function (callback) {
                $http.get(defaultMoodsFile).success(function (moodData) {
                    callback(moodData);
                }).error(function (data, status) {
                    console.log("Error: No mood data available, check moods.json is complete and correct!");
                });
            }
        }
    });