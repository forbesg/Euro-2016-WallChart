(function () {
  angular.module('App')
    .directive('googleMapAll', ['googleMapStyles', 'stadiumFactory', function (googleMapStyles, stadiumFactory) {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/google-map.html',
        link: function (scope, element) {
          var center = {
                lat: parseInt(46.956859, 10),
                lng: parseInt(2.7193793, 10)
              },
              map,
              marker,
              styles;
          googleMapStyles.getStyles().then(function (response) {
            styles = response.data[2];
            stadiumFactory.getStadium().then(function (response) {
              stadiumArray = response.data;

              var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
              function initMap () {
                map = new google.maps.Map(document.getElementById('map'), {
                  center: center,
                  zoom: 5,
                  navigationControl: false,
                  scrollwheel: false,
                  draggable: true,
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
                var markers = [];
                var initializeMarkerDrop = function () {
                  stadiumArray.forEach(function (stadium, index) {
                    var marker = new google.maps.Marker({
                      position: {
                        lat: parseFloat(stadium.coords.lat, 10),
                        lng: parseFloat(stadium.coords.long, 10)
                      },
                      animation: google.maps.Animation.DROP,
                      title: stadium.name,
                      city: stadium.city,
                      capacity: stadium.capacity
                    });
                    var contentString = "<div id='stadium-label' class='text-center'>" +
                      "<img src='images/football-stadium.png' width='70'/>" +
                      "<h4 style='font-weight: bold'>" +
                      stadium.name +
                      "</h4>" +
                      "<h6 style='font-weight: bold'>" +
                      stadium.city +
                      "</h6>" +
                      "<h6 style='font-weight: bold'>Club: " +
                      stadium.club +
                      "</h6>" +
                      "<h6 style='font-weight: bold'>Capacity: " +
                      stadium.capacity +
                      "</h6>" +
                      "</div>";
                    var infoWindow = new google.maps.InfoWindow({
                      content: contentString
                    })
                    // markers.push(marker);
                    marker.addListener('click', function () {
                      infoWindow.open(map, marker);
                    });
                    staggerMarker(marker, index * 500)
                  });
                  google.maps.event.clearInstanceListeners(map, 'tilesloaded');
                };

                function staggerMarker(marker, timeout) {
                  setTimeout(function () {
                    marker.setMap(map);
                  }, timeout);
                }


                map.mapTypes.set('map_style', styledMap);
                map.setMapTypeId('map_style');
                // label.open(map, marker);
                map.addListener('tilesloaded', initializeMarkerDrop);

              }
              initMap();
            }, function (err) {
              console.log(err);
            });
          }, function (err) {
            console.log(err);
          });

        }
      }
    }]);
})();
