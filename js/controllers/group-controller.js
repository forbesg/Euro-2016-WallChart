(function () {
  'use strict';
  angular.module('App')
    .controller('groupController', [
      '$scope',
      '$routeParams',
      '$location',
      'localStorageFactory',
      'groupsFactory',
      function ($scope, $routeParams, $location, localStorageFactory, groupsFactory) {
        var groupName = $routeParams.id;
        if(!JSON.parse(localStorage.euroData).groups[groupName]) {
          return $location.url('/');
        }
        var fixtures = JSON.parse(localStorage.euroData).fixtures.fixtures[groupName];
        $scope.groupName = groupName;
        $scope.group = JSON.parse(localStorage.euroData).groups[groupName].group;
        $scope.fixtures = fixtures;
        $scope.updateScore = function (score, group, index) {
          var fixture = fixtures[index];

          if (isNaN(score)) {
            this.fixture.score.hometeam = null;
            this.fixture.score.awayteam = null;
          } else {
            if (fixture.score.hometeam && fixture.score.awayteam) {
              //localStorageFactory.updateGroups(euroData);
              this.fixture.completed = true;
              groupsFactory.updateGroup(this.fixture, group, index);
              $scope.group = JSON.parse(localStorage.euroData).groups[groupName].group;
            } else {
              console.log('Must complete both scores before update function is fired');
            }
          }
        };
    }]);
})();
