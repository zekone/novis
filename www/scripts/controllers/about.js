'use strict';

/**
 * @ngdoc function
 * @name yoNovisApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yoNovisApp
 */
angular.module('yoNovisApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
