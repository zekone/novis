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
    'angularParse'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/category/:catID', {
        templateUrl: 'views/category.html',
        controller: 'CategoryCtrl'
      })



      .otherwise({
        redirectTo: '/'
      });
  });
