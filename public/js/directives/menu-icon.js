(function () {
  angular.module('App')
    .directive('menuIcon', function () {
      return {
        restrict: 'E',
        template: '<div id="menu-icon" class="visible-xs visible-sm"><i class="fa fa-bars"></i></div>',
        transclude: false,
        link: function (scope, element) {
          element.on('click', function () {
            element.parent().toggleClass('open');
          });
        }
      }
    })
})();
