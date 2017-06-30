app.controller('loginController', function($scope, $rootScope, $state,$auth,$http,toastr,todoService) {





  $rootScope.checkUser = function() {
    console.log("checkuser");
    var url = "/userProfile";
    var action = "get";
    todoService.app(url, action).then(function(response) {
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



  $rootScope.checkUser();


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
    var obj = todoService.app(url,method,userlogin);
    obj.then(function(data) {
      console.log("todoService");
      console.log(data.data.status);
      if (data.data.status == true) {
        $state.go('home');
        $rootScope.getNote();
      } else {
        $scope.error=data.data.message;
        $state.go('login');
      }

    }).catch(function(error) {
      console.log("error");
    })

  }


  $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(data) {
          console.log("google token",data);
          // var token=data.access_token;
          // localStorage.setItem("fb_token",token.access_token);
          // document.cookie="key="+token;
          toastr.success('You have successfully signed in with ' + provider + '!');
          // $location.path('/');
            $state.go('home');
        })
        .catch(function(error) {
          if (error.message) {
            // Satellizer promise reject error.
            toastr.error(error.message);
          } else if (error.data) {
            // HTTP response error from server
            toastr.error(error.data.message, error.status);
          } else {
            toastr.error(error);
          }
        });
    };

})
