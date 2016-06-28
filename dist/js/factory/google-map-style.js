(function () {
  angular.module('App')
    .factory('googleMapStyles',['$http', function ($http) {

      return {
        getStyles: function () {
          return $http.get('data/map-styles.json');
        }
      };
    }]);
})();
