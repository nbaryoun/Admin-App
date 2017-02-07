(function() {
  // 'use strict';

  /**
   * @todo Complete the test
   * This example is not perfect.
   * Test should check if MomentJS have been called
   */

  describe('directive map', function(){   //describe has two parameters a string and a function
    var map;  // The string is the title for a spec suite
    var el;  //the function is the block of code that implements the suite
    var dataPoints;
    var scope;


    beforeEach(module('Admin-App')); //beforeEach function is called once before each spec in the describe in which it is called
    beforeEach(inject(function($compile,$rootScope){

      scope = $rootScope.$new();

      scope.mapCreated = jasmine.createSpy('onCreate spy');

      el = angular.element('<map on-create="mapCreated"></map>'); //el is the nav bar component with the start and end time

      $compile(el)(scope);
      scope.$digest();
    }));

    it('should be compiled', function() {  // it should be compiled function expects el to not return null
      expect(el.html()).not.toEqual(null);
    });
  })
})();
