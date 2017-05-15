app.controller('noteController', function($scope) {
console.log("noteController");
    // checkuserservice.app().then(function(response){
    //   console.log(response);
    //   if(response.data.status==true)
    //   {
    //     $location.path('/welcomepage');
    //   }
    //   else {
    //     $location.path('/login');
    //
    //   }
    // })
    // $scope.IsVisible = false;
    // $scope.Visible=true;
    //
    // $scope.getNote = function () {
    //
    //
    //     $scope.Visible = $scope.Visible ? false : true;
    //     $scope.IsVisible = $scope.IsVisible ? false : true;
    //
    //
    //   }

});

app.service('getNote',function($http){

this.app=function(userlogin){
  return $http({url:"/get_data_notes",
method:"POST",
dataType:'JSON'
});
}
//
});
