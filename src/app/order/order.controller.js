/**
 * Created by mohamedisse on 9/22/16.
 */
(function() {
  'use strict';

  angular
    .module('Admin-App')
    .controller('OrderController', OrderController);

  /** @ngInject */
  function OrderController($timeout, toastr) {
    var order = this;

    order.mapCreated = function (map) {
      console.log('the map was created');
      order.map = map;
    }

  }
})();
