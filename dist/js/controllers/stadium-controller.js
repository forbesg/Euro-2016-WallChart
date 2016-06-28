(function () {
  'use strict';
  angular.module('App')
    .controller('stadiumController', ['$scope', '$routeParams', 'stadiumFactory', function ($scope, $routeParams, stadiumFactory) {
      var stadiumId = $routeParams.id;
      stadiumFactory.getStadium().then(function (response) {
        var stadiumArray = response.data.filter(function (stadium) {
          return stadium.name === stadiumId;
        });
        $scope.stadium = stadiumArray[0];
      }, function (err) {
        console.log(err);
      });
      $scope.name = stadiumId;
     }]);
})();
