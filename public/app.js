// var app = angular.module('myApp', ['ngRoute','ngSanitize']);
//
// app.config(function($routeProvider) {
//   $routeProvider
//
//   .when('/', {
//     templateUrl : 'templates/login.html',
//     // controller  : 'HomeController'
//   })
//
//   .when('/signup', {
//     templateUrl : 'templates/registration.html',
//     // controller  : 'registrationController'
//   })
//
//   .when('/login', {
//     templateUrl : 'templates/login.html',
//     // controller  : 'loginController'
//   })
//   .when('/welcomepage',{
//     templateUrl : 'templates/home.html',
//     // controller  : 'welcomepageController'
//   })
//   .otherwise({redirectTo: '/'});
// }).directive('newcontenteditable', [function() {
//       return {
//           require: '?ngModel',
//           scope: {
//           },
//           link: function(scope, element, attrs, ctrl) {
//               // view -> model (when div gets blur update the view value of the model)
//               element.bind('blur', function() {
//                   scope.$apply(function() {
//                       ctrl.$setViewValue(element.html());
//                   });
//               });
//               // model -> view
//               ctrl.$render = function() {
//                   element.html(ctrl.$viewValue);
//               };
//               // load init value from DOM
//               ctrl.$render();
//               // remove the attached events to element when destroying the scope
//               scope.$on('$destroy', function() {
//                   element.unbind('blur');
//                   element.unbind('paste');
//                   element.unbind('focus');
//               });
//           }
//       };
//   }]);
var app = angular.module('myApp', ['ui.router','ngSanitize','ui.bootstrap'])
  .config(function($stateProvider, $urlRouterProvider) {


    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeController',
        onEnter: function() {
          console.log("in home");
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginController',
        onEnter: function() {
          console.log('inside login');
        }
      }).state('signup', {
        url: '/signup',
        templateUrl: 'templates/registration.html',
        controller: 'registrationController',
        onEnter: function() {
          console.log('inside signup');
        }
      })
      $urlRouterProvider.otherwise('/home');

  })
  // app.directive('newcontenteditable',function() {
  //       return {
  //           require: '?ngModel',
  //           scope: {
  //           },
  //           link: function(scope, element, attrs, ctrl) {
  //               // view -> model (when div gets blur update the view value of the model)
  //               element.bind('blur', function() {
  //                   scope.$apply(function() {
  //                       ctrl.$setViewValue(element.html());
  //                   });
  //               });
  //               // model -> view
  //               ctrl.$render = function() {
  //                   element.html(ctrl.$viewValue);
  //               };
  //               // load init value from DOM
  //               ctrl.$render();
  //               // remove the attached events to element when destroying the scope
  //               scope.$on('$destroy', function() {
  //                   element.unbind('blur');
  //                   element.unbind('paste');
  //                   element.unbind('focus');
  //               });
  //           }
  //       };
  //   });
