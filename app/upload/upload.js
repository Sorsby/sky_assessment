
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
}]);