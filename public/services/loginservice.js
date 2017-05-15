app.service('loginservice',function($http){

this.app=function(userlogin){
  return $http({url:"http://localhost:8081/login",
method:"POST",
data:userlogin
});
}

});
