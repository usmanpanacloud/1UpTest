'use strict';

angular.module('fullstackTest')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url:'/',
        templateUrl: 'views/home/home.html',
        controller: 'HomeCtrl'
      });
  });
