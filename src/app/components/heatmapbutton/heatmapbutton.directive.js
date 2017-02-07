(function() {
  'use strict';

  angular
    .module('Admin-App')
    .directive('heatMapButton', heatMapButton);

  /** @ngInject */
  function heatMapButton() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/heatmapbutton/heatmapbutton.html',
      scope: {
      },
      controller: HeatMapButtonController,
      controllerAs: 'hm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function HeatMapButtonController() {
      var hm = this; //
      var heatmapData = []

    }
  }

})();
