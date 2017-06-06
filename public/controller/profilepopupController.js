app.controller('profilepopupController', function($scope, $rootScope, TodoService) {

  // $rootScope.userProfile.OriginalImage
  $scope.Original = $rootScope.userProfile.OriginalImage;
  $scope.CroppedImage = $rootScope.userProfile.CroppedImage;

  var handleFileSelect = function(evt) {
    var file = evt.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function(evt) {
      $scope.$apply(function($scope) {
        $scope.Original = evt.target.result;
      });
    };
    reader.readAsDataURL(file);
  };
  angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);


  $scope.close = function() {
    console.log("update cancel");
    // $uibmodalInstance.dismiss('close');
  };
  $scope.setCropImage = function(CroppedImage) {
    console.log("crop url", CroppedImage);
    console.log("Original",$scope.Original);
    // $rootScope.img = $scope.Original;

    var uploadimage = {
      "imagename":$rootScope.userProfile.userName,
      "Original":$scope.Original,
      "image": CroppedImage
    }

    TodoService.app('/uploadimage/'+$rootScope.userProfile._id+'', 'post', uploadimage).then(function(data) {
      console.log(data.data.status);
      $rootScope.getnote();

    }).catch(function(error) {
      console.log(error);
    })

  }
});
