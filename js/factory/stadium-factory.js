(function () {

  angular.module('App')
    .factory('stadiumFactory', ['$http', function ($http) {
      return {
        getStadium: function () {
          return $http.get('data/stadia.json');
        }
      }
    }]);

})();
