'use strict';

/**
 * @ngdoc service
 * @name yoNovisApp.catService
 * @description
 * # catService
 * Service in the yoNovisApp.
 */

Parse.initialize("1j0E51dRpLZBq2NhkYgxX87Cqxa2hPihxz4BMOQ1", "BbW4ni8kpXCauNMqWgI86ec7Exqq4AAeTqoPuEiy");

angular.module('yoNovisApp')
  .service('catService', function ($q) {
    //show the loader
    $(".spinner").show();
      var products = {

        getCatProducts: function(cat) {
          var defer = $q.defer();


          var categories = Parse.Object.extend("categories");
          var query = new Parse.Query(categories);

          query.equalTo("cat_id", parseInt(cat));

          query.find({
            success : function(res){
              var products = Parse.Object.extend("products");
              var query = new Parse.Query(products);

              query.equalTo("category", res[0]);

              query.find({
                success : function(r){
                  defer.resolve(r);
                  //here we got the products in the category we got in the previous .find()
                }
              });

            }
          });

          return defer.promise;

        },
        getProduct: function(id) {
          var defer = $q.defer();


          var products = Parse.Object.extend("products");
          var query = new Parse.Query(products);


          query.get(id, {
            success : function(res){
              defer.resolve(res);
            }
          });

          return defer.promise;
        },
        getProductSizes: function(id) {
          var defer = $q.defer();

          var products = Parse.Object.extend("product_sizes");
          var query = new Parse.Query(products);


          query.ascending("size");
          query.equalTo("prod_id", id);
          query.find({
            success: function(res){
              defer.resolve(res);
            }
          });
          //hide the loader
          return defer.promise;
        },


        getProductInv: function(product) {
          var defer = $q.defer();


          var products = Parse.Object.extend("inventory");
          var query = new Parse.Query(products);

          query.equalTo("product_id", product);

          query.find({
            success: function(res){
              defer.resolve(res);
            }
          });

          return defer.promise;
        },


        getOrderInfo: function(id){
          var defer = $q.defer();

          var Order = Parse.Object.extend("order");
          var query = new Parse.Query(Order);

          query.get( id, {
            success: function(info){
              defer.resolve(info);
            }
          });
          return defer.promise;
        },

        getUserOrders: function(userid){
          var defer = $q.defer();

          var Order = Parse.Object.extend("order");
          var User = Parse.Object.extend("User");


          var query = new Parse.Query(User);

          query.get(userid, {
            success: function(user){
              var query = new Parse.Query(Order);

              query.equalTo("user_id", user);
              query.descending("createdAt");

              query.find({
                success: function(orders){
                  defer.resolve(orders);
                }
              });
            }
          })

          return defer.promise;
        },

        getItemsinOrder: function(id){
          var defer = $q.defer();

          var orderitems = [];

          var OrderItem = Parse.Object.extend("orderedItem");

          var Order = Parse.Object.extend("order");
          var query = new Parse.Query(Order);

          query.get( id, {
            success: function(orderid){

              var query = new Parse.Query(OrderItem);
              query.equalTo("order_id", orderid);

              query.find({
                success: function(items){

                  for (var i=0; i<items.length; i++){

                    var item = items[i].attributes.inventory_id;

                    var inv = Parse.Object.extend("inventory");
                    var q = new Parse.Query(inv);

                    //REWORK WITH QUERY.THEN()S INSTEAD OF MORE DEFERS
                    //REWORK WITH QUERY.THEN()S INSTEAD OF MORE DEFERS
                    //REWORK WITH QUERY.THEN()S INSTEAD OF MORE DEFERS
                    //REWORK WITH QUERY.THEN()S INSTEAD OF MORE DEFERS
                    q.get(item.id, {
                      success: function(inv){

                        var prod = Parse.Object.extend("products");
                        var q2 = new Parse.Query(prod);

                        q2.get(inv.attributes.product_id.id, {
                          success: function(product){
                            console.log(product)
                            orderitems.push( product );
                            defer.resolve(product);

                          },
                          error: function(r, er){
                            console.log(er);
                          }
                        })
                      },
                      error: function(r, e){
                        console.log(e);
                      }
                    });
                    console.log("ORDERITEMS");
                    console.log(orderitems);
                    defer.resolve(orderitems);
                  }
                }
                });

            }

          });



          console.log("ITEMS: " );
          console.log(orderitems);
          return defer.promise;
        },

        GETITEMS: function(id){
          var defer = $q.defer();

          var orderitems = [];

          var OrderItem = Parse.Object.extend("orderedItem");

          var Order = Parse.Object.extend("order");
          var query = new Parse.Query(Order);

          query.get(id).then(function(res){
            console.log("res");
            console.log(res);

            //defer.resolve(res);
            return res;
          })


          return defer.promise;
        },




        //employee get all orders
        emp_GetAllOrders: function(){
          console.log("looking for all orders");
          var defer = $q.defer();

          var Order = Parse.Object.extend("order");
          var User = Parse.Object.extend("User");

          var query = new Parse.Query(Order);
          query.descending("createdAt");

          query.find( {
            success: function(orders){
                  defer.resolve(orders);
                }
              });

          return defer.promise;
        },


      };



      $(".spinner").hide();

    return products;

  });
