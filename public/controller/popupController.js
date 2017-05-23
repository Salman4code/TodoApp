app.controller('popupController', function($scope,title,$uibModal) {
console.log("popup");
  $scope.title=title;

  this.close = function () {
    console.log("fdjhgfdghfd h");
    // $uibModal.cancel('dismiss');
$uibModal.dismiss('cancel');
};
})
