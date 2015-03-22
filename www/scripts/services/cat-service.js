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

      };



      $(".spinner").hide();

    return products;

  });
