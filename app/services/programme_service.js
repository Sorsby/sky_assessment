'use strict';

angular.module('moodsliderApp')
    .factory('programmeService', function () {
        var programmeJson = null;
        return {
            getJson: function () {
                if (programmeJson) {
                    return programmeJson.programme_data.programme;
                }
                return null;
            },
            setJson: function (value) {
                programmeJson = value;
            }
        }
    });