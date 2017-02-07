(function() {
  'use strict';

  describe('UsersController', function(){
    var users;
    var $timeout;
    var toastr;

    beforeEach(module('marketingMap'));
    beforeEach(inject(function(_$controller_, _$timeout_, _toastr_,sampleData) {
      spyOn(_toastr_, 'info').and.callThrough();

      users = _$controller_('UsersController');
      $timeout = _$timeout_;
      toastr = _toastr_;
      sampleData.getUserData();
    }));


    it('should make users.toolbar.Title UsersToolbar', function () {
      expect(users.toolbar.Title).toEqual('Users Toolbar');
    });

    describe('users.mapCreated', function () {
      var data = 'this is a test';
      beforeEach(inject(function () {
        spyOn(users, 'loadMarkers');
        users.mapCreated(data);
      }));
      it('should assign data to users.map', function () {
        expect(users.map).toEqual(data);
      });
      it('should call users.loadMarkers', function () {
        expect(users.loadMarkers).toHaveBeenCalled();
      });
    });

    describe('users.getUsers', function () {
      beforeEach(inject(function() {
        users.getUsers();
      }));
      it('users.Users should be an array with User objects with an actions array', function () {
        expect(users.Users).toEqual(jasmine.any(Array)); //checks if its an array
        expect(users.Users.length > 0 ).toBe(true); //checks if the array's length is more than 0
        expect(users.Users[0].actions).toEqual(jasmine.any(Array)); //checks if the User object has an actions array
        expect(users.Users[0].userName).toEqual(jasmine.any(String));
        expect(users.Users[0].userId).toEqual(jasmine.any(String));
      });
    });

    describe('users.loadMarkers', function() {
      beforeEach(inject(function() {
        users.loadMarkers();
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
    describe('getActions', function() {
      beforeEach(inject(function() {
        users.getActions();
      }));
      it('FILL WITH CODEEEEE')
    });
  });
})();
