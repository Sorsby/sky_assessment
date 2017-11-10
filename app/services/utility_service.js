'use strict';

angular.module('moodsliderApp')
    .factory('utilityService', function () {
        return {
            isInArray: function (value, array) {
                return array.indexOf(value) > -1;
            },
            getRandomInt: function (min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
            }
        }
    });