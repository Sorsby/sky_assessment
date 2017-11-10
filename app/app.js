'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('moodsliderApp', [
  'ngRoute',
  'moodsliderApp.upload',
  'ui.bootstrap-slider',
  'ngFileUpload',
  'angularXml2json'
]).
config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.when('/home', {
    templateUrl: 'home/home_view.html',
    controller: 'HomeCtrl'
  });

  $routeProvider.otherwise({
    redirectTo: '/home'
  });
}]);

//TODO: Factor this out into a different file.
app.factory('myProgrammeDataService', function () {
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