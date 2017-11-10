'use strict';

angular.module('moodsliderApp')
    .controller('UploadCtrl', ['$scope', 'ngXml2json', '$location', 'programmeService', function ($scope, ngXml2json, $location, programmeService) {
        /**
         * With more time I would factor the logic of this code out into a service.
         * For now it's fine here as it only serves a single, simple purpose.
         * @param {*} file 
         * @param {*} errFiles 
         */
        $scope.uploadFiles = function (file) {
            if (file) {
                $scope.fileName = file.name;
                $scope.fileType = file.type;
                $scope.error = "";

                if (file.type != 'text/xml') {
                    $scope.error = "Invalid file type: You must upload a valid .xml file."
                    return;
                }
                if (file.size > 0.5e6) {
                    $scope.error = "Invalid file size: The maximum file size is 6MB."
                    return;
                }

                var reader = new FileReader();
                reader.onloadend = function (e) {
                    $scope.data = e.target.result;
                    var programmesJson = ngXml2json.parser($scope.data);
                    programmeService.setProgrammes(programmesJson);
                    $location.path("/home");
                };
                reader.readAsBinaryString(file);
            }
        }
    }]);