(function() {
  'use strict';

  describe('controllers', function(){
    var vendors;
    var $timeout;
    var toastr;

    beforeEach(module('Admin-App'));
    beforeEach(inject(function(_$controller_, _$timeout_, _toastr_,sampleData) {
      spyOn(_toastr_, 'info').and.callThrough();

      vendors = _$controller_('VendorsController');
      $timeout = _$timeout_;
      toastr = _toastr_;
    }));

    describe('vendors.mapCreated', function () {
      var data = 'this is a test';
      beforeEach(inject(function () {
        spyOn(users, 'loadMarkers');
        vendors.mapCreated(data);
      }));
      it('should assign data to users.map', function () {
        expect(vendors.map).toEqual(data);
      });
      it('should call users.loadMarkers', function () {
        expect(vendors.loadMarkers).toHaveBeenCalled();
      });
    });
    //TODO: Finish the vendor controller test
    describe('vendors.loadMarkers', function() {
      beforeEach(inject(function() {
        vendors.loadMarkers();
      }));
      it('needs to load markers into the markers array for Each user', function() {
        expect(users.Users[0].markers).toEqual(jasmine.any(Array));
        expect(users.Users[0].markers.length).toEqual(users.Users[0].actions.length);
      });
      it('should add the data for each action to a marker', function () {
        users.Users.forEach(function (user) {
          user.markers.forEach(function (marker, index) {
            expect(marker.data).toEqual(user.actions[index]);
          });
        });
      });
      it('each marker should be attached to the proper map', function() {
        users.Users.forEach(function (user) {
          user.markers.forEach(function (marker) {
            expect(marker.map).toEqual(users.map);
          });
        });
      });
    });


  });
})();
