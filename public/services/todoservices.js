// Sevice for calling Api from backend
app.service('todoService', function($http) {
  this.app = function(url, action, data) {
    console.log("todoService");
    return $http({
      url: url,
      method: action,
      data: data
    });
  }
});
