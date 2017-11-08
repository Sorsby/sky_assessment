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

    //TODO: factor out into provider/service.
    this.moods = {
      'mood1': {
        'min': 'Agitated',
        'max': 'Calm',
        'sliderValue': 5
      },
      'mood2': {
        'min': 'Happy',
        'max': 'Sad',
        'sliderValue': 5
      },
      'mood3': {
        'min': 'Tired',
        'max': 'Wide Awake',
        'sliderValue': 5
      },
      'mood4': {
        'min': 'Scared',
        'max': 'Fearless',
        'sliderValue': 5
      },
    }

    //TODO: factor out into provider/service.
    //should ideally be constructed as and when the sliders are changed with new recommendatiosn from uploaded data.
    this.programmes = {
      '1': {
        'title': 'No Content',
        'image_path': 'No Content'
      },
      '2': {
        'title': 'No Content',
        'image_path': 'No Content'
      },
      '3': {
        'title': 'No Content',
        'image_path': 'No Content'
      },
      '4': {
        'title': 'No Content',
        'image_path': 'No Content'
      },
      '5': {
        'title': 'No Content',
        'image_path': 'No Content'
      }
    }

  }]);