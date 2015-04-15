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

    $scope.items = [];

    var array = ngCart.getItems();

    //adding item titels to a long string
    for( var i =0; i< ngCart.getItems().length; i++){
      $scope.items.push( array[i] );
    }

    console.log("SCOPE ITEMS");
    console.log($scope.items);

    $scope.sub = function(){
      alert("sub ctrl");
    };
});
