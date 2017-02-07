(function() {
  'use strict';

  angular
    .module('marketingMap')
    .controller('OutsideController', OutsideController);

  /** @ngInject */
  function OutsideController($timeout, toastr, sampleData, $filter, randomColor) {
    var outside = this;
//creates map and then loads markers
    outside.mapCreated = function (map) {
      outside.map = map;
      outside.loadMarkers();
    };

    //figure out which Users have data
    outside.getUsers = function(){
      outside.Users = [];
      outside.data.forEach(function (item, index, array) {
        console.log(item);
        var newUser = {
          name: item.Name,
          points: [item]
        };

        var add = true;
        outside.Users.forEach(function (user) {
          if (newUser.name === user.name) {
            user.points.push(item);
            add = false;
          }
        });
        if (add) {
          outside.Users.push(newUser);
        }
      });
      console.log(outside.Users);
    };


//Loads markers on the page
    outside.loadMarkers = function () {
      outside.Users.forEach(function (user) {
        user.markers = [];
        var markerDates = [];
        user.points.forEach(function (point, index) {
          markerDates.push(point.Date);

          point.lat = point.Coordinates.split(',')[0];
          point.long = point.Coordinates.split(',')[1];

          var marker = new Marker({
            position: new google.maps.LatLng(point.lat, point.long),
            map: outside.map,
            title: point.Name,
            data: point,
            icon: {
              path: MAP_PIN,
              fillColor: '#D3D3D3',
              fillOpacity: 1,
              strokeColor: '#000000',
              strokeWeight: .3
            },
            map_icon_label: '<span class="map-icon map-icon-postal-code"></span>'
          });

          //Content in the info window using html
          var content = '<div>'+
            'Name: ' + marker.data.Name
            +'<br>'+
            new Date(marker.data.Date).toLocaleString()+
            '</div>';

          //Actually loading up the info window
          var infoWindow = new google.maps.InfoWindow({
            content: content
          });
          marker.addListener('click', function() {
            infoWindow.open(outside.map, marker);
          });
          user.markers.push(marker);
        });
        var max = markerDates.reduce(function (a, b) { return new Date(a) < new Date(b) ? a : b; }); //find the latest date // reduce takes values from markerDates(filters them by date)
        var markerIndex = markerDates.indexOf(max); //
        var latestMarker = user.markers[markerIndex];
        // TODO change the latest marker to have a fillOpacity of 1
        latestMarker.icon.fillColor = randomColor();
      });
    };


    outside.data = sampleData.getOutsideOrders();

    outside.getUsers();

  }
})();
