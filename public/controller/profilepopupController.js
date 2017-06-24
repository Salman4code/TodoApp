app.controller('profilepopupController', function($scope, $rootScope,$uibModalInstance, TodoService) {


  // $rootScope.userProfile.croppedImage
  $scope.Original = $rootScope.userProfile.local.originalImage;
  $scope.CroppedImage = "";

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
  $scope.image=function(){
    angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);

  }
  $scope.setCropImage = function(CroppedImage) {

    var uploadimage = {
      "imagename":$rootScope.userProfile.local.userName,
      "Original":$scope.Original,
      "image": CroppedImage
    }

    TodoService.app('/uploadimage/'+$rootScope.userProfile._id+'', 'post', uploadimage).then(function(data) {
      console.log(data.data.status);
      // $rootScope.getNote();
      $uibModalInstance.dismiss('close');

    }).catch(function(error) {
      console.log(error);
      $uibModalInstance.dismiss('close');

    })

  }
});
