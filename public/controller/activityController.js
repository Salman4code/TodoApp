app.controller('activityController', ['$scope', '$controller','$rootScope' ,'TodoService',function($scope,$controller,$rootScope,TodoService){
  $controller('HomeController', {$scope: $scope})
$scope.activityLog=false;

$rootScope.activityLogger=function(userId){
  var url = "/activityLog/" +userId + "";
  var action = "POST";

  var obj = TodoService.app(url, action);
  obj.then(function(data) {
    $rootScope.log=data.data.activity;
  }).catch(function(error) {
    console.log(error);
  })

  }
}])
