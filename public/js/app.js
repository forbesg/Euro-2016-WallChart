(function() {
  'use strict';
  var app = angular.module('App', ['ngRoute', 'ngAnimate']);

  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'homeController'
      })
      .when('/groups/:id', {
        templateUrl: 'partials/group.html',
        controller: 'groupController'
      })
      .when('/groups', {
        templateUrl: 'partials/groups.html',
        controller: 'groupsController'
      })
      .when('/fixtures', {
        templateUrl: 'partials/fixtures.html',
        controller: 'fixturesController'
      })
      .when('/knockout', {
        templateUrl: 'partials/last16.html',
        controller: 'lastSixteenController'
      })
      .when('/stadium/:id', {
        templateUrl: 'partials/stadium-view.html',
        controller: 'stadiumController'
      })
      .when('/stadium', {
        templateUrl: 'partials/stadia.html',
        controller: 'stadiaController'
      })
      .otherwise({
        redirectTo: '/'
      })
  });

  app.controller('timeController', ['$scope', function ($scope) {
    var time = new Date();
    $scope.time = time;
  }]);

  app.controller('groupsController', ['$scope', 'localStorageFactory', function ($scope, localStorageFactory) {
    $scope.title = 'Euro 2016 Groups';
    $scope.groups = localStorageFactory.checkLocalStorage().groups;
  }]);



})();
