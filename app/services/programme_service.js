'use strict';

angular.module('moodsliderApp')
    .factory('programmeService', function ($http) {
        var programmeJson = null;
        var defaultProgrammesFile = "../data/default_programmes.json";

        return {
            /**
             * Calls success cb when uploaded programme data is returned.
             * Calls the failure cb when no data is returned, which fetched default data.
             */
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