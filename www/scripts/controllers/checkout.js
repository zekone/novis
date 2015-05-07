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

    $scope.phone = false;

    $scope.shippingmethods = [];

    var Ship = Parse.Object.extend("shipping");
    var query = new Parse.Query(Ship);
    query.ascending("price");
    query.find( {
      success: function(res){
        console.log(res);
        for(var i=0; i < res.length; i++)
          $scope.shippingmethods.push(res[i].attributes);

          $scope.$apply();
      }

    });

    console.log(ngCart);

    $scope.shipping = {
      name : "",
      add1 : "",
      add2 : null,
      city : "",
      zip  : "",
      state: "",
      country: "",
      phone: ""

    };

    $scope.billing ={
      name : "",
      add1 : "",
      add2 : null,
      city : "",
      zip  : "",
      state: "",
      country: "",
      phone: ""

    };

    $scope.sameAddress = false;


    $scope.$watch('sameAddress', function(value) {
     console.log(value);
     if(value) {
        $scope.billing = $scope.shipping;
     } else {
        $scope.shipping = angular.copy($scope.shipping);
     }
    })

    var array = ngCart.getItems();

    //adding item titels to a long string
    for( var i =0; i< ngCart.getItems().length; i++){
      $scope.items.push( array[i] );
    }


    $scope.updateShipping = function(ship){
      ngCart.setShipping(ship.price);
    };
    console.log("ITEMS : " );
    console.log($scope.items);





    $scope.afunc = function(){
      console.log("SHIPPING");
      console.log($scope.shipping);

      var Order = Parse.Object.extend("order");
      var order = new Order();

      order.set("user_id", $rootScope.currentUser);

      order.set("status", "Pending");

      order.set("total", ngCart.totalCost());


      order.set("ship_method", $scope.shippingMethod.shippingOption);
      order.set("ship_cost", $scope.shippingMethod.price);

      //setting address
      order.set("ship_name", $scope.shipping.name);
      order.set("ship_add1", $scope.shipping.add1);
      order.set("ship_add2", $scope.shipping.add2);
      order.set("ship_city", $scope.shipping.city);
      order.set("ship_zip", $scope.shipping.zip);
      order.set("ship_state", $scope.shipping.state);
      order.set("ship_country", $scope.shipping.country);

      order.set("bill_name", $scope.billing.name);
      order.set("bill_add1", $scope.billing.add1);
      order.set("bill_add2", $scope.billing.add2);
      order.set("bill_city", $scope.billing.city);
      order.set("bill_zip", $scope.billing.zip);
      order.set("bill_state", $scope.billing.state);
      order.set("bill_country", $scope.billing.country);
      order.set("bill_phone", $scope.billing.phone);


      order.set("phone_order", $scope.phone);

      order.set("ship_phone", $scope.shipping.phone);


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
              //update the quantity by amount ordered
              it.set("quantity", it.attributes.quantity - item['_quantity']);
              it.save();

              //saving each ordered item
              var OrderedItem = Parse.Object.extend("orderedItem");
              var ordereditem = new OrderedItem();

              ordereditem.set("order_id", r);
              ordereditem.set("inventory_id", it);
              ordereditem.set("quantity", item['_quantity']);
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
