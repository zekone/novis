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
      $scope.items = d;
    })



});
