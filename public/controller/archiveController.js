app.controller('archiveController', ['$scope', '$controller', function($scope, $controller){
  $controller('HomeController', {$scope: $scope})
  //inside scope you the controllerOne scope will available

  $scope.booleanvalue=false;
  console.log("archive");

    $scope.navcolorbg={'background-color':'#607d8b'}; // changing background-color of navigation bar
    $scope.searchtextbox={'background-color':'#7a929e'};//changing background-color of search textbox
    $scope.changeColor={'fill':'white'} // changing background-color of navigation icons




}]);
