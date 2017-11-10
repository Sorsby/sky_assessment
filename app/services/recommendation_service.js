'use strict';

angular.module('moodsliderApp')
    .factory('recommendationService', function (utilityService) {
        var recommendations = [];

        /**
         * Returns an object of mood name:score pairs.
         * @param {*} moodData a JSON object representing the values of the 4 sliders on the webpage. 
         */
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
            console.log(moodScores);
            return moodScores;
        };

        return {
            /**
             * Returns an array of programme recommendations based on
             * the value of the moodsliders.
             */
            getProgrammeRecommendations: function (moodData, programmeData) {

                var moodScores = calculateMoodScores(moodData);
                var recommendations = [];
                var moodRankings = [];
                var totalMoodScore = 0;

                //loop through array of mood names and keep track of the highest slider value,
                //tracks multiple highest values through the equalScore variable.
                //save the mood name of the highest value(s) to an array in order of highest score.

                //double loop here is perfectly fine given the small input size of 4 moods.
                var moodsToProcess = Object.keys(moodScores);
                while (moodsToProcess.length != 0) {

                    var currentHighest = moodsToProcess[0];
                    var equalScores = []

                    for (var mood in moodScores) {
                        totalMoodScore = totalMoodScore + moodScores[mood];

                        if (moodScores[mood] > moodScores[currentHighest]) {
                            equalScores = []
                            currentHighest = mood;
                        } else if (moodScores[mood] == moodScores[currentHighest]) {
                            equalScores.push(mood);
                        }

                    }

                    //no slider input, return all programmes
                    if (totalMoodScore == 0) {
                        return programmeData;
                    }

                    //Add the moods in order of highest mood score.
                    if (!utilityService.isInArray(currentHighest, moodRankings)) {
                        moodRankings.push(currentHighest);
                    }

                    //Add moods with equal values to the ranking.
                    for (var mood in equalScores) {
                        if (!utilityService.isInArray(equalScores[mood], moodRankings)) {
                            moodRankings.push(equalScores[mood]);
                        }
                    }

                    //remove from the processing array.
                    moodsToProcess.splice(moodsToProcess.indexOf(currentHighest), 1);
                }

                console.log(moodRankings);

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