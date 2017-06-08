var app = angular.module('myApp', ['ui.router', 'ngSanitize', 'satellizer','ui.bootstrap', 'ui.bootstrap.datetimepicker', 'ngImgCrop', 'angularFileUpload'])
  .config(function($stateProvider, $urlRouterProvider,$authProvider) {


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
        // onEnter: function() {
        //   console.log('inside signup');
        // }
      }).state('archive', {
        url: '/archive',
        templateUrl: 'templates/home.html',
        controller: 'archiveController'

      })
    $urlRouterProvider.otherwise('/home');

    $authProvider.facebook({
      clientId: '463897587277156',
      name: 'facebook',
      url: '/auth/facebook',
      authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
      redirectUri: window.location.origin + '/',
      requiredUrlParams: ['display', 'scope'],
      scope: ['email'],
      scopeDelimiter: ',',
      display: 'popup',
      oauthType: '2.0',
      popupOptions: {
        width: 580,
        height: 400
      }
    });

    // $authProvider.google({
    //   clientId: 'Google Client ID'
    // });

    $authProvider.google({
      clientId: '1025675923961-s6igrgkb46k537on0li8n4giod96b9pg.apps.googleusercontent.com',
      url: '/auth/google',
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      redirectUri: window.location.origin,
      requiredUrlParams: ['scope'],
      optionalUrlParams: ['display'],
      scope: ['profile', 'email'],
      scopePrefix: 'openid',
      scopeDelimiter: ' ',
      display: 'popup',
      oauthType: '2.0',
      popupOptions: {
        width: 452,
        height: 633
      }
    });


  })


  app.controller('LoginCtrl', function($scope, $auth) {

      $scope.authenticate = function(provider) {
        $auth.authenticate(provider);
      };

    });
