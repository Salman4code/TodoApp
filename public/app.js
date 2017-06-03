var app = angular.module('myApp', ['ui.router', 'ngSanitize', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'ngImgCrop', 'angularFileUpload'])
  .config(function($stateProvider, $urlRouterProvider) {


    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        // controller: 'HomeController'

      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        // controller: 'loginController'

      }).state('signup', {
        url: '/signup',
        templateUrl: 'templates/registration.html',
        // controller: 'registrationController',
        // onEnter: function() {
        //   console.log('inside signup');
        // }
      })
    $urlRouterProvider.otherwise('/home');

  })
