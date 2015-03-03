'use strict';

/**
 * @ngdoc function
 * @name yoNovisApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the yoNovisApp
 */
angular.module('yoNovisApp')
.controller('ProductCtrl', function ($scope, $routeParams, catService, ngCart) {
  var id = $routeParams.prodID;


  catService.getProduct(id).then(function(d){
    $scope.item = d.attributes;
    $scope.item.id = d.id;

    catService.getProductSizes(d).then(function(a){
      $scope.sizes = a;
    });

  });


    ngCart.setTax(7.5);
    ngCart.setShipping(2.99);
    console.log (ngCart);

    $scope.focusImage = function(src){
      $('.img-large').attr('src', src);
    };
});
