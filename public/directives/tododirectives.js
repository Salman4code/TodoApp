app.directive('newcontenteditable', function() {
  return {
    require: '?ngModel',
    scope: {},
    link: function(scope, element, attrs, ctrl) {
      // view -> model (when div gets blur update the view value of the model)
      element.bind('blur', function() {
        scope.$apply(function() {
          ctrl.$setViewValue(element.html());
        });
      });
      // model -> view
      ctrl.$render = function() {
        element.html(ctrl.$viewValue);
      };
      // load init value from DOM
      ctrl.$render();
      // remove the attached events to element when destroying the scope
      scope.$on('$destroy', function() {
        element.unbind('blur');
        element.unbind('paste');
        element.unbind('focus');
      });
    }
  };
}).directive('testpackery', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        // console.log("link called on", element[0]);
        if ($rootScope.packery === undefined || $rootScope.packery === null) {
          scope.element = element;
          $rootScope.packery = new Packery(element[0].parentElement, {
            isResizeBound: true,
            // rowHeight: 230,
            // columnWidth: 230,
            itemSelector: '.dragCard'
          });
          $rootScope.packery.bindResize();
          var draggable1 = new Draggabilly(element[0]);
          $rootScope.packery.bindDraggabillyEvents(draggable1);

          draggable1.on('dragEnd', function(instance, event, pointer) {
            $timeout(function() {
              $rootScope.packery.layout();
              // $rootScope.packery.reloadItems();
            }, 200);
          });


          // var orderItems = function() {
          //   var itemElems = $rootScope.packery.getItemElements();
          //   console.log(itemElems);
          //   $(itemElems).each(function(i, itemElem) {
          //     $(itemElem).text(i + 1);
          //   });
          // };

          // $rootScope.packery.on('layoutComplete', orderItems);
          // $rootScope.packery.on('dragItemPositioned', orderItems);


        } else {
          // console.log("else", element[0]);
          var draggable2 = new Draggabilly(element[0]);
          $rootScope.packery.bindDraggabillyEvents(draggable2);


          draggable2.on('dragEnd', function(instance, event, pointer) {
            $timeout(function() {
              $rootScope.packery.layout();
            }, 200);
          });

        }
        $timeout(function() {
          $rootScope.packery.reloadItems();
          $rootScope.packery.layout();
        }, 100);
      }
    };

  }
])
app.directive('myTodo', function(){
    return {
      restrict: 'EA',
      templateUrl: 'templates/pinup.html',
      controller: 'HomeController',
      scope: {
        list: '=',
        pinuptitle: '@',
        color:'=',
      },
      link: function($scope, element, attrs) {}
    };
  });

app.directive('pinnedcards', function() {
  return {
    restrict: 'EA', //E = element, A = attribute, C = class, M = comment
    scope: {
      //@ reads the attribute value, = provides two-way binding, & works with functions
      title: '@'
    },
    templateUrl: 'templates/pinup.html',
    controller: 'HomeController', //Embed a custom controller in the directive
    link: function($scope, element, attrs) {} //DOM manipulation
  }
});

// app.directive('myDomDirective', function() {
//   return {
//     link: function($scope, element, attrs) {
//       element.bind('click', function() {
//         element.html('You clicked me!');
//       });
//       element.bind('mouseenter', function() {
//         element.css('background-color', 'yellow');
//       });
//       element.bind('mouseleave', function() {
//         element.css('background-color', 'white');
//       });
//     }
//   };
// });
// .directive('hideWhenClickAnywhere', function($window) {
//   return {
//
//     scope: {
//       defaultDisplay: '@',
//       note1Display: '@'
//     },
//
//     restrict: 'A',
//
//     link: function(scope, element, attrs) {
//
//       var el = element[0];
//
//       // el.style.display = scope.defaultDisplay || 'block';
//       // el.style.display = scope.note1Display || 'block';
//       angular.element($window).bind('click', function() {
//         // if (el.style.display === 'none') {
//         //   el.style.display = 'block';
//         //   return;
//         // }
//         console.log(scope.note1);
//         scope.note1=false;
//         el.style.display = 'none';
//       });
//     }
//
//   };
//
// });
