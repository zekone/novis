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
  $scope.related_items = {};

  catService.getProduct(id).then(function(product){
    $scope.product = product;
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

              query.descending("size");
              query.get(sizeid.id, {
                  success: function(a){
                    $scope.sizes.push( a );
                    $scope.$apply();

                },
                  error: function(e){

                }
              });

            }


    });

    //size change
    $scope.updateSize = function(size){

      var sizes = Parse.Object.extend("inventory");
      var query = new Parse.Query(sizes);
      query.equalTo("product_id", $scope.product);
      query.equalTo("size_id", size);
      query.find( {
        success: function(res){
          console.log(res);
          res = res[0];

          $scope.product.size_qt = res.attributes.quantity;

          $scope.product.size = res.attributes.size_id;
          $scope.inv_id = res.id;
          $scope.size_name = size.attributes.size;
          console.log($scope.product.size);


          $scope.$apply();

          console.log("quantity: " + res.attributes.quantity);
        },
        error: function(e){ console.log(e); }
      })

    };


    //related items
    var products = Parse.Object.extend("products");
    var query = new Parse.Query(products);
    var catid = $scope.item.category;

    query.limit(4);

    query.equalTo("category", catid);
    query.notEqualTo("objectId", $scope.item.id);
    query.find({
      success: function(res){
        $scope.related_items = res;
      }
    });



  });



    $scope.focusImage = function(src){
      $('.img-large').attr('src', src);
    };
});
