'use strict';

angular.module('moodsliderApp')
    .factory('recommendationService', function (utilityService) {
        var recommendations = [];

        //Calculates the values/names of the moods as per slider input
        var calculateMoodScores = function (moodData) {
            var moodScores = {};
            for (var key in moodData) {
                var mood = moodData[key];
                if (mood.sliderValue < 0) {
                    moodScores[mood.min] = Math.abs(mood.sliderValue);
                    continue;
                }
                moodScores[mood.max] = Math.abs(mood.sliderValue);
            }
            return moodScores;
        };

        return {
            /**
             * Returns an array of programme recommendations base on
             * the value of the moodsliders
             */
            getProgrammeRecommendations: function (moodData, programmeData) {

                var moodScores = calculateMoodScores(moodData);
                var recommendations = [];
                var moodRankings = [];
                var totalMoodScore = 0;

                //loop through array of mood names and keep track of the highest slider value,
                //save the mood name of the highest value to a ranking array for providing recommendations later.
                var moodsToProcess = Object.keys(moodScores);
                while (moodsToProcess.length != 0) {
                    var currentHighest = moodsToProcess[0];
                    for (var mood in moodScores) {
                        totalMoodScore = totalMoodScore + moodScores[mood];
                        if (moodScores[mood] > moodScores[currentHighest]) {
                            currentHighest = mood;
                        }
                    }

                    if (!utilityService.isInArray(currentHighest, moodRankings) &&
                        totalMoodScore > 0) {
                        moodRankings.push(currentHighest);
                    }
                    //remove from the processing array.
                    moodsToProcess.splice(moodsToProcess.indexOf(currentHighest), 1);
                }

                console.log(moodRankings);
                //if no slider input, show all programmes
                if (moodRankings.length == 0) {
                    recommendations = programmeData;
                }

                //use given rankings to display relevant programmes
                for (var mood in moodRankings) {
                    for (var programme in programmeData) {
                        if (moodRankings[mood] == programmeData[programme].mood) {
                            recommendations.push(programmeData[programme]);
                        }
                    }
                }
                console.log(recommendations);
                return recommendations;
            }
        }
    });