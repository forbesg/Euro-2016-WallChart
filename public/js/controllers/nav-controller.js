(function () {
  'use strict';
  angular.module('App')
    .controller('navController', ['$scope', 'localStorageFactory', function ($scope, localStorageFactory) {
      // Get group data from localStorage to use for group dropdown navigation
      localStorageFactory.checkLocalStorage( function (data) {
        $scope.groups = data.groups;
        $scope.showSubNav = function () {
          $scope.show = !$scope.show;
        };
      });
    }]);

    //Add Event listeners for controlling mobile navigation and dropdown menu
    var links = document.getElementsByTagName('li'),
        mainContainer = document.getElementsByClassName('main-container')[0],
        subnav;

    function closeMainContainer (e) {
      mainContainer.className = "main-container";
    }
    function getSubNavLinks() {
      var subnavLinks = document.getElementById('subnav').getElementsByTagName('li');
      for (var j = 0; j < subnavLinks.length; j += 1) {
        subnavLinks[j].addEventListener('click', closeMainContainer);
      }
    }
    for (var i = 0; i < links.length; i += 1) {
        if (links[i].childElementCount < 2) {
          links[i].addEventListener('click', closeMainContainer);
        }
        if (links[i].childElementCount === 2) {
          links[i].addEventListener('click', getSubNavLinks);
        }
    };
})();
