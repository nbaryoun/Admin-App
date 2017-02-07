(function() {
  'use strict';

  /**
   * @todo Complete the test
   * This example is not perfect.
   * Test should check if MomentJS have been called
   */

  describe('searchbar directive', function(){
    var search;
    var el;

    beforeEach(module('Admin-App'));
    beforeEach(inject(function($compile, $rootScope) { // before the $compile and $rootScope are injected


      el = angular.element('<search-bar></search-bar>'); //el is the search bar

      $compile(el)($rootScope.$new()); //compiles an html string or DOM into a template / also creates new instance of rootScope.Scope that inherent from $rootScope
      $rootScope.$digest(); //
      search = el.isolateScope().search;
      // ctrl = el.controller('acmeNavbar');
    }));

    it('should be compiled', function() {  // it should be compiled function expects el to not return null
      expect(el.html()).not.toEqual(null);
    });

    it('should have isolate scope object with instanciate members', function() { //it should isolate the scope object with instanciate members
      expect(search).toEqual(jasmine.any(Object)); //expect search to equal search Object

    });

  })
})();
