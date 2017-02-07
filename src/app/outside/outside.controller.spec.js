(function() {
  'use strict';

  describe('Outside', function(){
    var outside;
    var $timeout;
    var toastr;

    beforeEach(module('marketingMap'));
    beforeEach(inject(function(_$controller_, _$timeout_, _toastr_,sampleData) {
      spyOn(_toastr_, 'info').and.callThrough();

      outside = _$controller_('Oustide');
      $timeout = _$timeout_;
      toastr = _toastr_;
    }));


    describe('outside.mapCreated', function () {
      var data = 'this is a test';
      beforeEach(inject(function () {
        spyOn(outside, 'loadMarkers');
        outside.mapCreated(data);
      }));
      it('should assign data to users.map', function () {
        expect(outside.map).toEqual(data);
      });
      it('should call users.loadMarkers', function () {
        expect(outside.loadMarkers).toHaveBeenCalled();
      });
    });

    describe('outside.getUsers', function () {
      beforeEach(inject(function() {
        outside.getUsers();
      }));
      it('users.Users should be an array with User objects with an actions array', function () {
        expect(outside.Users).toEqual(jasmine.any(Array)); //checks if its an array
        expect(outside.Users.length > 0 ).toBe(true); //checks if the array's length is more than 0
        expect(outside.Users[0].points).toEqual(jasmine.any(Array)); //checks if the User object has an actions array
        expect(outside.Users[0].name).toEqual(jasmine.any(String));
      });
    });

    describe('users.loadMarkers', function() {
      beforeEach(inject(function() {
        outside.loadMarkers();
      }));
      it('needs to load markers into the markers array for Each user', function() {
        expect(outside.Users[0].markers).toEqual(jasmine.any(Array));
        expect(outside.Users[0].markers.length).toEqual(outside.Users[0].points.length);
      });
      it('should add the data for each action to a marker', function () {
        outside.Users.forEach(function (user) {
          user.markers.forEach(function (marker, index) {
            expect(marker.data).toEqual(user.points[index]);
          });
        });
      });
      it('each marker should be attached to the proper map', function() {
        outside.Users.forEach(function (user) {
          user.markers.forEach(function (marker) {
            expect(marker.map).toEqual(outside.map);
          });
        });
      });
    });

  });
})();
