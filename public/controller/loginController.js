app.controller('loginController', function($scope, $rootScope, $state, loginservice,checkuserservice,TodoService) {



  $rootScope.checkuser = function() {
    console.log("checkuser");
    checkuserservice.app().then(function(response) {
      console.log(response);
      if (response.data.status == true) {

        // $location.path('/welcomepage');
        $state.go('home');
        // $rootScope.getnote();
      } else {
        // $location.path('/login');
        $state.go('login');

      }
    }).catch(function(error) {
      console.log("error");
    })

  }


  // $rootScope.checkuser();


  $scope.login = function() {
    var email_id = $scope.email_id;
    var password = $scope.password;
    console.log(email_id);
    var userlogin = {
      email: email_id,
      password: password
    }
    var url='/login'
    var method="post"
    var obj = TodoService.app(url,method,userlogin);
    obj.then(function(data) {
      console.log("TodoService");
      console.log(data.data.status);
      if (data.data.status == true) {
        $state.go('home');
        $rootScope.getnote();
      } else {
        alert(data.data.message);
        $state.go('login');
      }

    }).catch(function(error) {
      console.log("error");
    })
    // if(validatelogininput(userlogin))
    // {
    //   console.log("login successful");
    // }
    // else {
    //   console.log("login failed");
    // }

  }


})
// app.service('loginservice', function($http) {
//
//   this.app = function(userlogin) {
//     return $http({
//       url: "/login",
//       method: "POST",
//       data: userlogin
//     });
//   }
//   //
// });
// .service('checkuserservice', function($http) {
//
//   this.app = function() {
//     return $http({
//       url: "http://localhost:8081/welcome",
//       method: "get",
//     });
//   }
//   //
// });
// function validatelogininput(login)
// {
// var Useremail=login.email_id;
// var password=login.password;
// console.log("pass",password);
// var emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// var passwordregex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
// console.log(Useremail);
// if(Useremail==""||Useremail==undefined || Useremail==null){
//   //  $('span').remove();
//   //  $('#email_id').after('<p style="margin-left:15%;"><span style="color:red;">'+"Please Enter email_id"+'</span></p>');
//   alert("please enter email_id")
//    return false;
// }
// else if (!emailregex.test(Useremail)) {
//
//  //  $('span').remove();
//  // $('#email_id').after('<p style="margin-left:15%;"><span style="color:red;">'+"Please Enter valid email_id"+'</span></p>');
//  console.log("invalid email_id");
//  alert("invalid email_id")
//   return false;
// }
// else if (password=="" || password == undefined || password== null) {
//   console.log("check password");
//  //  $('span').remove();
//  // $("#password").after('<p style="margin-left:15%;"><span style="color:red;">'+"Please Enter password"+'</span></p>');
//  alert("please Enter password")
//   return false;
// }
// else if (!passwordregex.test(password)) {
//   // $('span').remove();
//   // $("#password").after('<p style="margin-left:15%;"><span style="color:red;">'+"Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character"+'</span></p>');
//   alert("Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character")
//   return false;
// }
// return true;
// }
