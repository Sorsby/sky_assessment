'use strict';

angular.module('moodsliderApp')
    .factory('programmeService', function ($http) {
        var programmeJson = null;
        var defaultProgrammesFile = "../data/default_programmes.json";

        return {
            getProgrammes: function (success, failure) {
                if (programmeJson) {
                    success(programmeJson.programme_data.programme);
                    return;
                }
                $http.get(defaultProgrammesFile).success(function (data) {
                    failure(data);
                }).error(function (data, status) {
                    console.log("Error: No programme data available, check programme.json is complete and correct!");
                });
            },
            setProgrammes: function (value) {
                programmeJson = value;
            }
        }
    });