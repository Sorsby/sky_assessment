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

        /**
         * Loops through array of mood names and keep track of the highest slider value,
         * Tracks multiple highest values through the equalScore variable.
         * Save the mood name of the highest value(s) to an array in order of highest score.
         * Returns an array of the highest ranked moods.
         * @param {*} moodData 
         */
        var calculateMoodRankings = function (moodData) {

            var moodScores = calculateMoodScores(moodData);
            var moodRankings = [];
            var totalMoodScore = 0;

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
                    return null;
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
            return moodRankings;
        };

        return {
            /**
             * Returns an array of programme recommendations based on
             * the rankings of the moods as calculated by calculateMoodRankings.
             */
            getProgrammeRecommendations: function (moodData, programmeData) {

                var recommendations = [];                
                var moodRankings = calculateMoodRankings(moodData);

                if (!moodRankings) return programmeData;

                for (var mood in moodRankings) {
                    for (var programme in programmeData) {
                        if (moodRankings[mood] == programmeData[programme].mood) {
                            recommendations.push(programmeData[programme]);
                        }
                    }
                }
                return recommendations;
            }
        }
    });