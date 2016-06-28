(function () {
  angular.module('App')
    .directive('groupTable', [function (element, scope) {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/group-table.html'
      };
    }])
})();
