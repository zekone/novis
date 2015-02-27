'use strict';

/**
 * @ngdoc function
 * @name yoNovisApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the yoNovisApp
 */
angular.module('yoNovisApp')
  .controller('CategoryCtrl', function ($scope, $routeParams, catService) {
    var id = $routeParams.catID;

    $scope.id = id;


    var categories = Parse.Object.extend("categories");
    var query = new Parse.Query(categories);


    query.equalTo("cat_id", parseInt(id));

    catService.getCatProducts(id).then(function(d){
      $scope.products = d;
    })





    // query.find({
    //   success: function(res){
    //       console.log(res[0]);
    //       var catid = res[0].attributes['cat_id'];
    //
    //
    //       var products = Parse.Object.extend("products");
    //       var query = new Parse.Query(products);
    //       query.equalTo("category", res[0]);
    //
    //       query.find({
    //              success :  function(prods){
    //                console.log(prods);
    //                $scope.products = prods;
    //              },
    //              error : function(error) {
    //                 alert("Error: " + error.code + " " + error.message);
    //              }
    //
    //       });
    //
    //
    //   }
    // });
    //


  });
