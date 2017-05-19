app.service('loginservice', function($http) {

  this.app = function(userlogin) {
    return $http({
      url: "/login",
      method: "POST",
      data: userlogin
    });
  }

}).service('signupservice',function($http){

this.app=function(userSignupdetail){
  return $http({url:"/signup",
method:"POST",
data:userSignupdetail
});
}

}).service('getNoteService', function($http) {

  this.app = function() {
    return $http({
      url: "/get_data_notes",
      method: "POST",
      dataType: 'JSON'
    });
  }
}).service('SaveNoteService', function($http) {

  this.app = function(noteobj) {
    return $http({
      url: "/data_notes",
      method: "POST",
      dataType: 'JSON',
      data: noteobj
    });
  }
}).service('deleteNoteService', function($http) {

  this.app = function(id) {
    return $http({
      url:  "/delete_data_notes/" + id + "",
      method: "POST"
    });
  }

}).service('logOutService', function($http) {

  this.app = function() {
    return $http({
      url: "/logout",
      method: "POST"
    });
  }
}).service('checkuserservice', function($http) {
  this.app = function() {
    return $http({
      url: "/welcome",
      method: "get",
    });
  }
  //
});
