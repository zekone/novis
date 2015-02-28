'use strict';

/**
 * @ngdoc function
 * @name yoNovisApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the yoNovisApp
 */
angular.module('yoNovisApp')
.controller('ProductCtrl', function ($scope, $routeParams, catService) {
  var id = $routeParams.prodID;


  catService.getProduct(id).then(function(d){
    $scope.product = d.attributes;
  });


});
