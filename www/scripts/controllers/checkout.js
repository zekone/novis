'use strict';

/**
 * @ngdoc function
 * @name yoNovisApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the yoNovisApp
 */
angular.module('yoNovisApp')
.controller('CheckoutCtrl', function ($scope, ngCart, $location, $rootScope) {

    $scope.ngCart = ngCart;

    $scope.items = [];

    var array = ngCart.getItems();

    //adding item titels to a long string
    for( var i =0; i< ngCart.getItems().length; i++){
      $scope.items.push( array[i] );
    }


    $scope.afunc = function(){

      /////


      var Order = Parse.Object.extend("order");
      var order = new Order();

      order.set("user_id", $rootScope.currentUser);

      order.set("status", "Pending");

      order.set("total", ngCart.totalCost());
      order.save(null, {
        success: function(r) {
          // The object was saved successfully.
          console.log("SUCCESSFULLY MADE ORDER");

          //now add each item into ordereditems rows
          for( var i=0; i < $scope.items.length; i++ ){
            var item = $scope.items[i];

            var inventory = Parse.Object.extend("inventory");
            var query = new Parse.Query(inventory);

            query.get( item['_id'] ).then(function(it){
              var OrderedItem = Parse.Object.extend("orderedItem");
              var ordereditem = new OrderedItem();

              ordereditem.set("order_id", r);
              ordereditem.set("inventory_id", it);
              return ordereditem.save();
            });

          }

            ngCart.empty();
            window.location.hash = "#/complete/" + r.id + "/thanks";
        },
        error: function(r, error) {
          // The save failed.
          console.log(error);
          // error is a Parse.Error with an error code and message.
        }
      });





    };
    //close afunc

    window.ngCart = ngCart;

});
