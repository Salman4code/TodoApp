// var app = angular.module('myApp', ['ngRoute']);

app.controller('registrationController', function($scope, $location,$state,signupservice) {
  // $scope.message = 'Hello from registrationController';
  // $scope.email_regex = /[a-z0-9._-]+@[a-z]+\.+[a-z]{2,3}$/;
  // $scope.password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  // console.log(Useremail);;


  $scope.register=function() {
    alert($scope.name)
    var name=$scope.name;
    var email_id=$scope.email_id;
    var mobile=$scope.mobile;
    var password=$scope.password;
    var rpassword=$scope.rpassword;
    console.log(email_id);
    // console.log(password);
    // alert($scope.email_id);
    var userSignupdetail={
      username:name,
      email:email_id,
      mobile:mobile,
      password:password
    }
     var obj=signupservice.app(userSignupdetail);
     obj.then(function(data){
       console.log(data.data.status);
       if(data.data.status==true)
       {
        //  $location.path('home');
        $state.go('home');

       }
       else {
        //  $location.path('login');
        $state.go('login');

       }

     }).catch(function(error){
       console.log("error");
     })
  }
});


// app.service('signupservice',function($http){
//
// this.app=function(userSignupdetail){
//   return $http({url:"/signup",
// method:"POST",
// data:userSignupdetail
// });
// }
//
// });
