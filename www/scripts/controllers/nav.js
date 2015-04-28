'use strict';
angular.module('yoNovisApp')
  .controller('NavCtrl', function ($scope, $location) {

    $scope.isActive = function(route) {
        return route === $location.path();
    };

    var categories = Parse.Object.extend("categories");
    var query = new Parse.Query(categories);

    query.find({
      success: function(res){
        $scope.categories = res;
        console.log(res);
        $scope.$apply();
      }, error: function(e,r){
        console.log(e);
      }
    })

  });
