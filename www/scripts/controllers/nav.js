'use strict';

/**
 * @ngdoc function
 * @name yoNovisApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the yoNovisApp
 */
angular.module('yoNovisApp')
  .controller('NavCtrl', function ($scope, $location) {
    $scope.test = "TEST";

    $scope.isActive = function(route) {
        return route === $location.path();
    };


    
  });
