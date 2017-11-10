'use strict';

var app = angular.module('moodsliderApp', [
    'ngRoute',
    'ui.bootstrap-slider',
    'ngFileUpload',
    'angularXml2json'
  ])

  .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.when('/home', {
      templateUrl: 'views/home_view.html',
      controller: 'HomeCtrl'
    });
    $routeProvider.when('/upload', {
      templateUrl: 'views/upload_view.html',
      controller: 'UploadCtrl'
    });
    $routeProvider.otherwise({
      redirectTo: '/home'
    });
  }]);