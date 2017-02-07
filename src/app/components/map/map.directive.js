(function() {
  'use strict';

  angular
    .module('marketingMap')
    .directive('map', map); //This directive loads the map on the view


  /** @ngInject */
  function map() {   //function map defined as var directive
    var directive = {  //the variable directive
      restrict: 'E',   //can only be used as an element
      templateUrl: 'app/components/map/map.html',  //
      scope: {//scope variables for directive controller
        onCreate: '&'
      },
      controller: MapController,   //controller name
      controllerAs: 'map',   //controller as map
      link: function ($scope, $element) {
        var mapContainer = $element[0].children[0];
        var mapCanvas = mapContainer.children[0];
        function initialize() {
          var mapOptions = {
            center: new google.maps.LatLng(38.8462, -77.3064),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          var map = new google.maps.Map(mapCanvas, mapOptions);


          $scope.onCreate({map: map});

          // Stop the side bar from dragging when mousedown/tapdown on the map
          google.maps.event.addDomListener(mapCanvas, 'mousedown', function (e) {
            e.preventDefault();
            return false;
          });
        }

        if (document.readyState === "complete") {
          initialize();
        } else {
          google.maps.event.addDomListener(window, 'load', initialize());
        }
      }
    };

    return directive;

    /** @ngInject */
    function MapController(){

    }

  }

})();
