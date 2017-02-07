(function() {
  'use strict';

  describe('BringersController', function(){
    var bringers;
    var $timeout;
    var toastr;

    beforeEach(module('marketingMap'));
    beforeEach(inject(function(_$controller_, _$timeout_, _toastr_,sampleData) {
      spyOn(_toastr_, 'info').and.callThrough();

      bringers = _$controller_('BringersController');
      $timeout = _$timeout_;
      toastr = _toastr_;
      sampleData.getBringerData();
    }));


    it('should make bringers.toolbar.Title BringersToolbar', function () {
      expect(bringers.toolbar.Title).toEqual('Bringers Toolbar');
    });

    describe('bringers.mapCreated', function () {
      var data = 'this is a test';
      beforeEach(inject(function () {
        spyOn(users, 'loadMarkers');
        bringers.mapCreated(data);
      }));
      it('should assign data to bringers.map', function () {
        expect(bringers.map).toEqual(data);
      });
      it('should call bringers.loadMarkers', function () {
        expect(bringers.loadMarkers).toHaveBeenCalled();
      });
    });

    describe('bringers.getBringers', function () {
      beforeEach(inject(function() {
        bringers.getBringers();
      }));
      it('bringers.Bringers should be an array with Bringer objects with an actions array', function () {
        expect(bringers.Bringers).toEqual(jasmine.any(Array)); //checks if its an array
        expect(bringers.Bringers.length > 0 ).toBe(true); //checks if the array's length is more than 0
        expect(bringers.Bringers[0].actions).toEqual(jasmine.any(Array)); //checks if the User object has an actions array
        expect(bringers.Bringers[0].bringer).toEqual(jasmine.any(String));
        expect(bringers.Bringers[0].numOfOrders).toEqual(jasmine.any(String));
      });
    });

    describe('bringers.loadMarkers', function() {
      beforeEach(inject(function() {
        bringers.loadMarkers();
      }));
      it('needs to load markers into the markers array for Each bringer', function() {
        expect(bringers.Bringers[0].markers).toEqual(jasmine.any(Array));
        expect(bringers.Bringers[0].markers.length).toEqual(bringers.Bringers[0].actions.length);
      });
      it('should add the data for each action to a marker', function () {
        bringers.Bringers.forEach(function (bringer) {
          bringer.markers.forEach(function (marker, index) {
            expect(marker.data).toEqual(bringer.actions[index]);
          });
        });
      });
      it('each marker should be attached to the proper map', function() {
        bringers.Bringers.forEach(function (bringer) {
          bringer.markers.forEach(function (marker) {
            expect(marker.map).toEqual(bringers.map);
          });
        });
      });
    });
    describe('getActions', function() {
      beforeEach(inject(function() {
        bringers.getActions();
      }));
      it('FILL WITH CODEEEEE')
    });
  });
})();
