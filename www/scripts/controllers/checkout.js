'use strict';

/**
 * @ngdoc function
 * @name yoNovisApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the yoNovisApp
 */
angular.module('yoNovisApp')
.controller('CheckoutCtrl', function ($scope, ngCart) {

    $scope.ngCart = ngCart;

});
