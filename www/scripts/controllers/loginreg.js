'use strict';

/**
 * @ngdoc function
 * @name yoNovisApp.controller:LoginregCtrl
 * @description
 * # LoginregCtrl
 * Controller of the yoNovisApp
 */
angular.module('yoNovisApp')
  .controller('LoginregCtrl', function ($scope, ngCart, $rootScope) {


    $scope.scenario = "Log in";




    $rootScope.logOut = function(form) {
      Parse.User.logOut();
      $rootScope.currentUser = null;
      ngCart.empty();

    };




     $rootScope.signUp = function(form) {
       var user = new Parse.User();
       user.set("email", form.email);
       user.set("username", form.username);
       user.set("password", form.password);

       user.signUp(null, {
         success: function(user) {
           $scope.currentUser = user;
           $scope.$apply();
         },
         error: function(user, error) {
           alert("Unable to sign up:  " + error.code + " " + error.message);
         }
       });
     };

     $rootScope.logIn = function(form) {
       Parse.User.logIn(form.username, form.password, {
         success: function(user) {
           $rootScope.currentUser = user;

           $scope.$apply();
         },
         error: function(user, error) {
           alert("Unable to log in: " + error.code + " " + error.message);

         }
       });
     };





  });
