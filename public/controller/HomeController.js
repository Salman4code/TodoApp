// var app = angular.module('myApp', ['ngRoute']);

app.controller('HomeController', function($scope,getNote) {

  $scope.getnote=function()
  {
    $scope.note1=true;
    $scope.note2=false;
    var obj=getNote.app();
    obj.then(function(data){
      console.log(data.data.status);
      if(data.data.status==true)
      {
        console.log(data.data.message);
      }
      else {
console.log(data.data.message);
 }

    }).catch(function(error){
      console.log("error");
    })

}


}).service('getNote',function($http){

this.app=function(userlogin){
  return $http({url:"/get_data_notes",
method:"POST",
dataType:'JSON'
});
}
//
});
