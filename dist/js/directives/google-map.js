(function () {
  angular.module('App')
    .directive('googleMap', ['googleMapStyles', function (googleMapStyles) {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/google-map.html',
        link: function (scope, element) {
          var location = {
                lat: parseFloat(scope.stadium.coords.lat, 10),
                lng: parseFloat(scope.stadium.coords.long, 10)
              },
              finsHooseLocation = {
                lat: parseFloat("56.002882", 10),
                lng: parseFloat("-2.5163617", 10)
              },
              map,
              labelContent = "<div id='stadium-label' class='text-center'>" +
                "<img src='images/football-stadium.png' width='70'/>" +
                "<h4 style='font-weight: bold'>" +
                scope.stadium.name +
                "</h4>" +
                "<h6 style='font-weight: bold'>" +
                scope.stadium.city +
                "</h6>" +
                "</div>";
          var finsHooseLabelContent = "<div id='finsHooseLabel'>" +
                                      "<div><p>Fin &amp; Ali</p><p>live here!!</p></div>" +
                                      "</div>";
          var label = new google.maps.InfoWindow({
                center: location,
                content: labelContent
              }),
              marker,
              finHooseLabel = new google.maps.InfoWindow({
                    center: location,
                    content: finsHooseLabelContent
                  }),
              finsHouseMarker,
              styles;
          googleMapStyles.getStyles().then(function (response) {
            styles = response.data[2];
            var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
            function initMap () {
              map = new google.maps.Map(document.getElementById('map'), {
                // center: {lat: 51.528308, lng: -0.3817765},
                center: location,
                zoom: 5,
                navigationControl: false,
                scrollwheel: false,
                draggable: false,
                style: styles,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_TOP
                },
                streetViewControl: true,
                streetViewControlOptions: {
                  position: google.maps.ControlPosition.LEFT_TOP
                },
                mapTypeControlOptions: {
                  style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                  position: google.maps.ControlPosition.TOP_LEFT,
                  mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                }
              });
              marker = new google.maps.Marker({
                position: location,
                map: map,
                title: scope.stadium.name
              });
              finsHouseMarker = new google.maps.Marker({
                position: finsHooseLocation,
                map: map,
                title: "Fins House",
                icon: 'images/brothers-small.png'
              });
              map.mapTypes.set('map_style', styledMap);
              map.setMapTypeId('map_style');
              label.open(map, marker);
              finsHouseMarker.addListener('click', function () {
                finHooseLabel.open(map, finsHouseMarker);
              });
            }
            initMap();
          }, function (err) {
            console.log(err);
          });

        }
      }
    }]);
})();
