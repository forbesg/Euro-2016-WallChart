(function () {
  'use strict';
  angular.module('App')
    .directive('fixtureCard', function () {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/fixture-card.html'
      };
    })


})();
