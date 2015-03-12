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

  console.log(ngCart.getItems());
  
  $scope.sizes = [];

  catService.getProduct(id).then(function(product){
    $scope.item = product.attributes;
    $scope.item.id = product.id;


    catService.getProductSizes(product).then(function(a){
      //$scope.sizes = a;
    });


    catService.getProductInv(product).then(function(inv){
        $scope.inventory = inv;

            for(var i=0; i< inv.length; i++){

              var sizeid = $scope.inventory[i].get("size_id");

              var sizes = Parse.Object.extend("sizes");
              var query = new Parse.Query(sizes);

              query.ascending("size");
              query.get(sizeid.id, {
                  success: function(a){
                    $scope.sizes.push( a.attributes.size );
                    $scope.$apply();
                },
                  error: function(e){

                }
              });

            }

    });



  });



    $scope.focusImage = function(src){
      $('.img-large').attr('src', src);
    };
});
