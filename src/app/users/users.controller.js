(function() {
  'use strict';

  angular
    .module('Admin-App')
    .controller('UsersController', UsersController);

  /** @ngInject */
  function UsersController($timeout, toastr, sampleData, $filter, randomColor) {
    var users = this;
//creates map and then loads markers
    users.mapCreated = function (map) {
      users.map = map;
      users.loadMarkers();
    };

    users.data = sampleData.getUserData(); //users.data is taken from the sampleData Service
    //figure out which Users have data
    users.getUsers = function(){
      users.Users = []; //user.Users array is defined
      users.data.forEach(function (item, index, array) { //for each user
        var newUser = {
          userName: item.UserName,
          userId: item.UserId,
          actions: [item]
        };

        var add = true;
        users.Users.forEach(function (user) {
          if (newUser.userId === user.userId) {
            user.actions.push(item);
            add = false;
          }
        });
        if (add) {
          users.Users.push(newUser);
        }
      });
    };
    users.getUsers();
//

//Loads markers on the page
    users.loadMarkers = function () {
      users.Users.forEach(function (user) {
        user.markers = [];
        var markerDates = [];
        user.actions.forEach(function (point, index) {
          markerDates.push(point.DateTime);

          var marker = new Marker({
            position: new google.maps.LatLng(point.lat, point.long),
            map: users.map,
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
            'Action: ' + marker.data.Action
            +'<br>'+
            new Date(marker.data.DateTime).toLocaleString()+
            '</div>';

          //Actually loading up the info window
          var infoWindow = new google.maps.InfoWindow({
            content: content
          });
          marker.addListener('click', function() {
            infoWindow.open(users.map, marker);
          });
          user.markers.push(marker);
          console.log(user.markers);
        });
        var max = markerDates.reduce(function (a, b) { return new Date(a) < new Date(b) ? a : b; }); //find the latest date // reduce takes values from markerDates(filters them by date)
        var markerIndex = markerDates.indexOf(max); //
        var latestMarker = user.markers[markerIndex];
        // TODO change the latest marker to have a fillOpacity of 1
        latestMarker.icon.fillColor = randomColor();
      });

    };

    // TODO fix the type error that says user is undefined
    // //if statement action.visible for loop through action
    //
    // // // users.getActions = function () { //runs a for loop through users.data
    // // //   users.data.forEach(function (item) { // the loop goes through
    // // //     var newAction = {  //
    // // //       name: item.Action, //each item has an action
    // // //       visible: true
    // // //     };
    // // //     //this will work for now (need to figure out way to only check if the action exists ignoring the visible bool)
    // // //     var add = true; //if add == true
    // // //     users.toolbar.actions.forEach(function (action) {
    // // //       if (newAction.name === action.name) { //if the action
    // // //         add = false
    // // //       }
    // // //     });
    // // //     if (add) {
    // // //       users.toolbar.actions.push(newAction);
    // // //     }
    // // //   });
    // // // };
    // // users.getActions();
    // users.toolbar.actions = [];
    //
    // var actionChecker = function (compare) {
    //   var hide = false;
    //    users.toolbar.actions.forEach(function (action, index, array) {
    //      if(action.name == compare){
    //        if(!action.visible){
    //          hide = true;
    //        }
    //      }
    //    });
    //   return hide;
    // };
    //
    // function filter() {
    //   console.log('filtering');
    //   users.Users.forEach(function (user, index, array) {
    //     user.markers.forEach(function (marker) {
    //       if (marker.data.DateTime > users.toolbar.date.end || marker.data.DateTime < users.toolbar.date.start){ //filter the dates
    //         marker.setMap(null);
    //       }else if(actionChecker(marker.data.Action)){ //then filter the actions
    //         marker.setMap(null);
    //       }
    //       else{
    //         marker.setMap(users.map);
    //       }
    //     })
    //   });
    // }
    //
    // users.filterDate = function () {
    //   filter();
    //   console.log(users.toolbar.date);
    // };
    // //TODO : Create filter
    //
    // users.filterActions = function () {
    //   console.log(users.toolbar.actions);
    //   filter();
    // };




    //users toolbar has title, action & date
    users.toolbar = {};
    users.toolbar.Title = 'Users Toolbar';
    var defaultStart = new Date().setMonth(new Date().getMonth() - 1);
    users.toolbar.date = {
      start: new Date(defaultStart).toUTCString(),
      end: new Date().toUTCString()
    };
  }
})();
