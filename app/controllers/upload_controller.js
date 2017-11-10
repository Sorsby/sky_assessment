'use strict';

angular.module('moodsliderApp')
    .controller('UploadCtrl', ['$scope', 'ngXml2json', '$location', 'myProgrammeDataService', function ($scope, ngXml2json, $location, myProgrammeDataService) {
        $scope.uploadFiles = function (file, errFiles) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    $scope.data = e.target.result;
                    var jsonObject = ngXml2json.parser($scope.data);

                    //send the data to the service.
                    myProgrammeDataService.setJson(jsonObject);
                    //route back to the home page.
                    $location.path("/home");
                };
                reader.readAsBinaryString(file);
            }
        }
    }]);