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
}).directive('hideWhenClickAnywhere', function($window) {
  return {

    scope: {
      defaultDisplay: '@',
      note1Display: '@'
    },

    restrict: 'A',

    link: function(scope, element, attrs) {

      var el = element[0];

      // el.style.display = scope.defaultDisplay || 'block';
      // el.style.display = scope.note1Display || 'block';
      angular.element($window).bind('click', function() {
        // if (el.style.display === 'none') {
        //   el.style.display = 'block';
        //   return;
        // }
        console.log(scope.note1);
        scope.note1=false;
        el.style.display = 'none';
      });
    }

  };

});
