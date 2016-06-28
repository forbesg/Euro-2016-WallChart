(function () {
  'use strict';
  angular.module('App')
    .controller('winnersController', ['$scope', 'localStorageFactory', function ($scope, localStorageFactory) {
      var data = localStorageFactory.getLocalStorage();
      console.log(data);
      $scope.winners = data.winners;
    }]);
})();
