app.controller('activityController', ['$scope', '$controller', '$rootScope', 'TodoService', function($scope, $controller, $rootScope, TodoService) {
  $controller('HomeController', {
    $scope: $scope
  })
  $scope.activityLog = false;
  $scope.navcolorbg = {
    'background-color': '#607d8b'
  }; // changing background-color of navigation bar
  $scope.searchtextbox = {
    'background-color': '#7a929e'
  }; //changing background-color of search textbox
  $scope.changeColor = {
    'fill': 'white'
  } // changing background-color of navigation icons

  $rootScope.activityLogger = function(userId) {
    var url = "/activityLog/" + userId + "";
    var action = "POST";

    var obj = TodoService.app(url, action);
    obj.then(function(data) {
      $rootScope.log = data.data.activity;
    }).catch(function(error) {
      console.log(error);
    })

  }
}])
