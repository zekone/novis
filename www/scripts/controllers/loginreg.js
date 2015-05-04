'use strict';

/**
 * @ngdoc function
 * @name yoNovisApp.controller:LoginregCtrl
 * @description
 * # LoginregCtrl
 * Controller of the yoNovisApp
 */
angular.module('yoNovisApp')
  .controller('LoginregCtrl', function ($scope, ngCart, $rootScope, catService) {


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
       user.set("isEmployee", false);

       user.signUp(null, {
         success: function(user) {
           $scope.currentUser = user;
           $scope.$apply();
         },
         error: function(user, error) {
           //alert("Unable to sign up:  " + error.code + " " + error.message);
           $(".signup-form").prepend(
           "<div class='alert alert-danger alert-dismissible col-lg-8 col-lg-offset-2' role='alert'>\
           <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>\
           <strong>Couldn't sign up. </strong>"
           + error.message
           );

         }
       });
     };

     $rootScope.logIn = function(form) {
       Parse.User.logIn(form.username, form.password, {
         success: function(user) {
           $rootScope.currentUser = user;
           $rootScope.currentUser.emp = user.attributes.isEmployee;
           var isEmp = user.attributes.isEmployee;

           if( isEmp ){ //user is employee, show all orders
             emp_GetAllOrders();

           }else
            getOrders();

         },
         error: function(user, error) {
          //  alert("Unable to log in: " + error.code + " " + error.message);
          $(".login-form").prepend(
          "<div class='alert alert-danger alert-dismissible col-lg-8 col-lg-offset-2' role='alert'>\
          <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>\
          <strong>Couldn't log in. Check your username and password.</strong></div>"
          );

         }
       });
     };


     if( $rootScope.currentUser){

       if( $rootScope.currentUser.attributes.isEmployee ){ //user is employee, show all orders
         emp_GetAllOrders();
       }else
        getOrders();
      }



      function getOrders(){
        catService.getUserOrders($rootScope.currentUser.id).then(function(d){
          $scope.orders = d;
        });
      }


      function emp_GetAllOrders(){
        catService.emp_GetAllOrders().then(function(d){
          $scope.orders = d;
        });
      }

      $scope.changeOrderStatus = function(id, status){
        var Order = Parse.Object.extend("order");
        var query = new Parse.Query(Order);

        query.get(id, {
          success: function(order){
            order.set('status', status);
            order.save();
            $scope.$apply();
          },
          error: function(r,e){
            alert("Couldn't get order to update!");
          }
        });

      }



      $('#myTab a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
      })


  });
