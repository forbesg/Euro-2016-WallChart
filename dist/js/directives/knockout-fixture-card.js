(function () {
  'use strict';
  angular.module('App')
    .directive('knockoutFixtureCard', function () {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/knockout-fixture-card.html'
      };
    });
})();
