app.controller('reminderController', ['$scope', '$controller', function($scope, $controller){
  $controller('HomeController', {$scope: $scope})
  //inside scope you the controllerOne scope will available

  // $scope.booleanvalue=false;
  console.log("reminder");
  $scope.reminderdisplay=false;
  // $scope.reminder=function(){
    $scope.navcolorbg={'background-color':'#607d8b'};
    $scope.archivesearchtextbox={'background-color':'#7a929e'};
    // $scope.archive=false;
    // $scope.googlekeep=true;
    // $scope.reminder=true;
  // }



}]);
