app.controller('reminderController', ['$scope', '$controller', function($scope, $controller) {
  $controller('HomeController', {
    $scope: $scope
  })
  //inside scope you the controllerOne scope will available

  // $scope.booleanvalue=false;
  console.log("reminder");
  $scope.reminderdisplay = false;
  $scope.navcolorbg = {
    'background-color': '#607d8b'
  };
  $scope.searchtextbox = {
    'background-color': '#7a929e'
  };
  $scope.changeColor = {
    'fill': 'white'
  } // changing background-color of navigation icons




}]);
