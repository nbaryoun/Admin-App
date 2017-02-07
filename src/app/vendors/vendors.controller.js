(function() {
  'use strict';

  angular
    .module('Admin-App')
    .controller('VendorsController', VendorsController);

  /** @ngInject */
  function VendorsController($timeout, toastr, sampleData) {
    var vendors = this;
    //creates map then loads markers
    vendors.mapCreated = function (map) {
      vendors.map = map;
      vendors.loadMarkers();
    };


    //loads the marks
    vendors.loadMarkers = function () {
      vendors.data.forEach(function(vendor){
        vendor.markers = [];
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(vendor.Geolocation.CurrentLat,vendor.Geolocation.CurrentLong),
          map: vendors.map,
          title: vendor.Place_id,
          data: vendor
        });
        //info window content
        var content = '<div>'+
          'Vendor Name: ' + vendor.VendorName
          +'<br>'+
          'Vendor Location: ' + vendor.VendorAddress
          +'<br>'+
          'Number of Orders: ' + vendor.Num_of_Orders
          +'<br>'+
          'Money Spent: ' + vendor.Money_Spent +
          '</div>';

        var infoWindow = new google.maps.InfoWindow({
          content: content
        });

        marker.addListener('click', function() {
          infoWindow.open(vendors.map, marker);
        });

        vendor.markers.push(marker);
        console.log(vendor.markers);
      });
    };

    //gets vendor data from service
    vendors.data = sampleData.getVendorData();

  }


})();
