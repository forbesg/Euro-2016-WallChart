(function () {
  'use strict';
  angular.module('App')
    .controller('stadiaController', ['$scope', 'stadiumFactory', function ($scope, stadiumFactory) {
      var stadiumArray;
      // stadiumFactory.getStadium().then(function (response) {
      //   stadiumArray = response.data;
      //   $scope.stadiumArray = stadiumArray;
      // }, function (err) {
      //   console.log(err);
      // });
   }]);
})();
