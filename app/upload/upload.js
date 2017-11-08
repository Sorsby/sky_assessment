
'use strict';

angular.module('moodsliderApp.upload', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/upload', {
    templateUrl: 'upload/upload_view.html',
    controller: 'UploadCtrl'
  });
}])

.controller('UploadCtrl', [function() {
  this.placeholder = "Upload Controller Working!"
  //TODO: Implement the functionality of uploading data XML files.
}]);