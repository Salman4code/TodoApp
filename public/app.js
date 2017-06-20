var app = angular.module('myApp', ['ui.router', 'ngSanitize', 'satellizer', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'ngImgCrop', 'angularFileUpload', 'toastr'])
  .config(function($stateProvider, $urlRouterProvider, $authProvider) {


    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeController'

      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        // controller: 'loginController'

      }).state('signup', {
        url: '/signup',
        templateUrl: 'templates/registration.html',
        // controller: 'registrationController',

      }).state('archive', {
        url: '/archive',
        templateUrl: 'templates/home.html',
        controller: 'archiveController'

      }).state('reminder', {
        url: '/reminder',
        templateUrl: 'templates/home.html',
        controller: 'reminderController'

      }).state('trash', {
        url: '/trash',
        templateUrl: 'templates/home.html',
        controller: 'trashController'
        
      })
    // .state('logout', {
    //   url: '/logout',
    //   template: '/login',
    //   controller: 'logoutController'
    // })
    $urlRouterProvider.otherwise('/home');

    $authProvider.facebook({
      clientId: '463897587277156'
    });


    $authProvider.google({
      clientId: '1025675923961-jop21qmj2rjnl7dlma0nt2774315f7ad.apps.googleusercontent.com',
    });


  })
