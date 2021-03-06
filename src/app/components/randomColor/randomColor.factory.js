
(function() {
  'use strict';

  angular
    .module('Admin-App')
    .factory('randomColor', randomColor);

  /** @ngInject */
  function randomColor() {
    function getRandomColor () {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    return getRandomColor;
  }
})();
