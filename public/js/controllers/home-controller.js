(function () {
  'use strict';
  angular.module('App')
    .controller('homeController', ['$scope', '$location', 'localStorageFactory', '$timeout', function ($scope, $location, localStorageFactory, $timeout) {
      localStorageFactory.checkLocalStorage(function () {
        console.log('Local Storage is available');
      });

      $scope.todos = [
        'Style Fixtures Tab - make sure it works in knockout stages',
        'Page for all stadia allowing zoom in for info from map'
      ];

      $scope.development = true;

      $scope.confirmationRequired = false;
      $scope.confirmReset = function () {
        $scope.confirmationRequired = true;
      };
      $scope.closeConfirmation = function () {
        $scope.confirmationRequired = false;
        console.log('data deletion cancelled!');
      };
      $scope.confirmDelete = function () {
        localStorageFactory.removeLocalStorage();
        $scope.confirmationRequired = false;

        $scope.toast = "Data has been cleared";
        localStorageFactory.checkLocalStorage();
        $timeout(function () {
          console.log('null toast');
          $scope.toast = null;
        }, 3000);
      };
    }]);
})();
