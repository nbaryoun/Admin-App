(function() {
  'use strict';

  angular
    .module('Admin-App')
    .directive('searchBar', searchBar);

  /** @ngInject */
  function searchBar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/searchbar/searchbar.html',
      scope: {
      },
      controller: SearchbarController,
      controllerAs: 'search',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function SearchbarController() {
      var search = this;

    }
  }

})();
