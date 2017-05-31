
app.service('TodoService', function($http) {
  this.app = function(url,action,data) {
    console.log("TodoService");
    return $http({
      url: url,
      method:action,
      data:data
    });
  }
});
