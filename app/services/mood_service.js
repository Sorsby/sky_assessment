'use strict';

angular.module('moodsliderApp')
    .factory('moodService', function ($http) {
        var moodJson = null;
        var defaultMoodsFile = "../data/default_moods.json";

        return {
            setupMoodSliders: function (callback) {
                $http({
                    method: 'GET',
                    url: defaultMoodsFile
                }).then(function (data) {
                    var moodData = data.data;
                    callback(moodData);
                }, function (error) {
                    console.log("Error: No mood data available, check moods.json is complete and correct!");
                });
            }
        }
    });