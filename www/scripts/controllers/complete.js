'use strict';

/**
 * @ngdoc function
 * @name yoNovisApp.controller:CompleteCtrl
 * @description
 * # CompleteCtrl
 * Controller of the yoNovisApp
 */
angular.module('yoNovisApp')
.controller('CompleteCtrl', function ($scope, $timeout, $rootScope, $routeParams, catService, _) {

  var id = $routeParams.orderID;
  var thanks = $routeParams.thanks;
  $scope.thanks = thanks;


  var Order = Parse.Object.extend("order");
  var query = new Parse.Query(Order);


  $scope.orderInfo ="a";

  catService.getOrderInfo(id).then(function(a){
    $scope.orderInfo = a;
  });

  // catService.getItemsinOrder(id).then(function(d){
  //   $scope.orderItems = d;
  // });

  // catService.GETITEMS(id).then(function(d){
  //   $scope.orderItems = d;
  // });

  $scope.orderItems=[];


  var OrderItem = Parse.Object.extend("orderedItem");

  var Order = Parse.Object.extend("order");
  var query = new Parse.Query(Order);



  query.get(id).then(function(order) {
    $scope.order = order;

    query = new Parse.Query(OrderItem);
    query.equalTo("order_id", order);

    query.find().then(function(orderitems){
      console.log(orderitems);
      _.each(orderitems, function(result, index) {
          $scope.orderItems[index] = {};


          var inv = Parse.Object.extend("inventory");
          var query = new Parse.Query(inv);

          query.get( result.attributes.inventory_id.id,{
            success: function(res){

              var prod = Parse.Object.extend("products");
              var query = new Parse.Query(prod);

              query.get( res.attributes.product_id.id,{
                success: function(r){
                  console.log(r);
                  $scope.orderItems[index].product = r;
                  $timeout( function(){$scope.$apply();}, 100);
                }
              })


              var size = Parse.Object.extend("sizes");
              var query = new Parse.Query(size);

              query.get( res.attributes.size_id.id,{
                success: function(r){

                  $scope.orderItems[index].size = r.attributes.size;
                  $scope.$apply();
                }
              })

            },
            error: function(r,e){
              console.log(e);
            }

          });



      });



    });


  });




});
