'use strict';

angular.module('moodsliderApp.home', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'home/home_view.html',
      controller: 'HomeCtrl'
    });
  }])

  .controller('HomeCtrl', [function () {

    this.moodMin = 0;
    this.moodMax = 10;
    this.moods = {
      'mood1': {
        'min': 'Agitated',
        'max': 'Calm',
        'sliderValue':0
      },
      'mood2': {
        'min': 'Happy',
        'max': 'Sad',
        'sliderValue':0
      },
      'mood3': {
        'min': 'Tired',
        'max': 'Wide Awake',
        'sliderValue':0
      },
      'mood4': {
        'min': 'Scared',
        'max': 'Fearless',
        'sliderValue':0
      },
    }

    this.placeholder = "Home Controller Working!"
  }]);