(function() {
  'use strict';

  /**
   * @todo Complete the test
   * This example is not perfect.
   * Test should check if MomentJS have been called
   */
  describe('directive heatMapButton', function() {
    // var $window;
    var hm;
    var el;
    var scope;

    beforeEach(module('Admin-App'));
    beforeEach(inject(function($compile, $rootScope) {

      scope = $rootScope.$new();

      el  = angular.element('<heat-map-button></heat-map-button>');

      $compile(el)(scope);
      scope.$digest();
      hm = el.isolateScope().hm;

    }));

    it('should be compiled', function() {
      expect(el.html()).not.toEqual(null);
    });

    it('should have isolate scope object with instanciate members', function() {
      expect(hm).toEqual(jasmine.any(Object));

    });
  });
})();
