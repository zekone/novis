'use strict';

/**
 * @ngdoc overview
 * @name yoNovisApp
 * @description
 * # yoNovisApp
 *
 * Main module of the application.
 */

Parse.initialize("1j0E51dRpLZBq2NhkYgxX87Cqxa2hPihxz4BMOQ1", "BbW4ni8kpXCauNMqWgI86ec7Exqq4AAeTqoPuEiy");


angular
  .module('yoNovisApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularParse',
    'ngCart'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        label: "home"

      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/category/:catID', {
        templateUrl: 'views/category.html',
        controller: 'CategoryCtrl',
        label: "category"

      })
      .when('/product/:prodID', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl',
        label: "Product"

      })


      .otherwise({
        redirectTo: '/'
      });
  })


  // DIRECTIVES
  .directive('productCard', function() {
    return {
      scope: true,  // use a child scope that inherits from parent
      restrict: 'AE',
      replace: 'true',
      templateUrl: 'partials/product_card.html'
    };
  })

  .directive('novImage', function(){
    return {
      scope: true,  // use a child scope that inherits from parent
      restrict: 'A',
      
      templateUrl: 'partials/images.html'
    };
  })


  ;
