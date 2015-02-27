'use strict';

/**
 * @ngdoc function
 * @name yoNovisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoNovisApp
 */



angular.module('yoNovisApp')
  .controller('MainCtrl', function ($scope, parsePersistence, parseQuery) {


    var query = parseQuery.new('products').limit(10);

    parseQuery.find(query)
    .then(function(results) {
      $scope.items = results;
      // nested promise :)
      console.log(results);

    })
   .then(function(total) {

    }, function(error) {
      alert(JSON.stringify(error));
    });

});
