(function() {
  'use strict';

  angular
    .module('marketingMap')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/users', {
        templateUrl: 'app/users/users.html',
        controller: 'UsersController',
        controllerAs: 'users'
      })
      .when('/vendors',{
        templateUrl: 'app/vendors/vendors.html',
        controller: 'VendorsController',
        controllerAs: 'vendors'
      })
      .when('/bringers', {
        templateUrl: 'app/bringers/bringers.html',
        controller: 'BringersController',
        controllerAs: 'bringers'
      })
      .when('/order',{
        templateUrl: 'app/order/order.html',
        controller: 'OrderController',
        controllerAs: 'order'
      })
      .when('/outside',{
        templateUrl: 'app/outside/outside.html',
        controller: 'OutsideController',
        controllerAs: 'outside'
      })
      .otherwise({
        redirectTo: '/users'
      });
  }
})();
