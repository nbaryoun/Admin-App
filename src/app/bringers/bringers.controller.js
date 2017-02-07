(function() {
  'use strict';

  angular
    .module('marketingMap')
    .controller('BringersController', BringersController);

  /** @ngInject */
  function BringersController($timeout, toastr, sampleData, randomColor) {
    var bringers = this;

    bringers.mapCreated = function (map) {
      bringers.map = map;
      bringers.loadMarkers();
    };

    bringers.loadMarkers = function(){
      bringers.data.forEach(function(bringer){
        bringer.markers = [];
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(bringer.lat,bringer.long),
          map: bringers.map,
          title:bringer.UserId,
          data: bringer
        });

        var content = '<div>'+
          'Bringer Name: ' + bringer.UserName
          +'<br>'+
          'Bringer Action: ' + bringer.Action
          +'<br>'+
          'Delivery Count ' + bringer.NumberOfOrders +
          '</div>';

        var infoWindow = new google.maps.InfoWindow({
          content: content
        });
        marker.addListener('click',function(){
          infoWindow.open(bringers.map,marker);
        });
        bringer.markers.push(marker);
        console.log(bringer.markers)
      })
    };

    bringers.data = sampleData.getBringerData();

    bringers.getBringers = function(){
      bringers.Bringers = [];
      bringers.data.forEach(function (item, index, array) {
        var newBringer = {
          userName: item.UserName,
          userId: item.UserId,
          actions: [item]
        };

        var add = true;
        bringers.Bringers.forEach(function (bringer) {
          if (newBringer.userId === bringer.userId) {
            bringer.actions.push(item);
            add = false;
          }
        });
        if (add) {
          bringers.Bringers.push(newBringer);
        }
      });
    };

    bringers.loadMarkers = function () {
      bringers.Bringers.forEach(function (bringer) {
        bringer.markers = [];
        var markerDates = [];
        bringer.actions.forEach(function (point, index) {
          markerDates.push(point.DateTime);

          var marker = new Marker({
            position: new google.maps.LatLng(point.lat, point.long),
            map: bringers.map,
            title: point.UserName,
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
            'UserName: ' + marker.data.UserName
            +'<br>'+
            'Action: ' + marker.data.Actions
            +'<br>'+
            new Date(marker.data.DateTime).toLocaleString()+
            '</div>';

          //Actually loading up the info window
          var infoWindow = new google.maps.InfoWindow({
            content: content
          });
          marker.addListener('click', function() {
            infoWindow.open(bringers.map, marker);
          });
          bringer.markers.push(marker);
        });
        var max = markerDates.reduce(function (a, b) { return new Date(a) < new Date(b) ? a : b; }); //find the latest date // reduce takes values from markerDates(filters them by date)
        var markerIndex = markerDates.indexOf(max); //
        var latestMarker = user.markers[markerIndex];
        // TODO change the latest marker to have a fillOpacity of 1
        latestMarker.icon.fillColor = randomColor();
      });
    };

    bringers.getActions = function () {
      bringers.data.forEach(function (item) {
        var newAction = {
          name: item.Action,
          visible: true
        };
        //this will work for now (need to figure out way to only check if the action exists ignoring the visible bool)
        var add = true;
        bringers.toolbar.actions.forEach(function (action) {
          if (newAction.name === action.name) {
            add = false
          }
        });
        if (add) {
          bringers.toolbar.actions.push(newAction);
        }
      });
    };

    bringers.filterDate = function () {
      console.log(bringers.toolbar.date);
    };

    bringers.filterActions = function () {
      console.log(bringers.toolbar.actions);
    };

    bringers.toolbar = {};
    bringers.toolbar.Title = 'Bringers Toolbar';
    var defaultStart = new Date().setMonth(new Date().getMonth() - 1);
    bringers.toolbar.date = {
      start: new Date(defaultStart).toUTCString(),
      end: new Date().toUTCString()
    };

    bringers.toolbar.actions = [];

    bringers.data = sampleData.getBringerData();

    bringers.getActions();

    bringers.getBringers();

  }
})();
