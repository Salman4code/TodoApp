app.controller('trashController', ['$scope', '$controller', function($scope, $controller){
  $controller('HomeController', {$scope: $scope})
  //inside scope you the controllerOne scope will available

  // $scope.booleanvalue=false;
  console.log("trash");
  $scope.trashDisplay=false;
  // $scope.reminder=function(){
    $scope.navcolorbg={'background-color':'#636363'};
    $scope.archivesearchtextbox={'background-color':'#7c7c7c'};
    // $scope.archive=false;
    // $scope.googlekeep=true;
    // $scope.reminder=true;
  // }



}]);
