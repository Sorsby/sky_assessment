'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('moodsliderApp', [
  'ngRoute',
  'moodsliderApp.home',
  'moodsliderApp.upload',
  'ui.bootstrap-slider'
]).
config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({
    redirectTo: '/home'
  });
}]);