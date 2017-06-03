app.controller('profilepopupController', function($scope,$rootScope) {
        $scope.myImage='';
        $scope.CroppedImage='';

        var handleFileSelect=function(evt) {
          var file=evt.currentTarget.files[0];
          var reader = new FileReader();
          reader.onload = function (evt) {
            $scope.$apply(function($scope){
              $scope.myImage=evt.target.result;
            });
          };
          reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);


        $scope.close = function() {
          console.log("update cancel");
          // $uibmodalInstance.dismiss('close');
        };
        $scope.setCropImage=function(img){
              console.log("crop url",img);
               $rootScope.img=$scope.CroppedImage;
        }

 //  uploader.onAfterAddingFile = function(item) {
 //   $scope.croppedImage = '';
 //   var reader = new FileReader();
 //   reader.onload = function(event) {
 //     $scope.$apply(function(){
 //       $scope.image = event.target.result;
 //     });
 //   };
 //   reader.readAsDataURL(item._file);
 // };

 /**
  * Upload Blob (cropped image) instead of file.
  * @see
  *   https://developer.mozilla.org/en-US/docs/Web/API/FormData
  *   https://github.com/nervgh/angular-file-upload/issues/208
  */
 // uploader.onBeforeUploadItem = function(item) {
 //   var blob = dataURItoBlob($scope.croppedImage);
 //   item._file = blob;
 // };

 /**
  * Converts data uri to Blob. Necessary for uploading.
  * @see
  *   http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
  * @param  {String} dataURI
  * @return {Blob}
  */
 // var dataURItoBlob = function(dataURI) {
 //   var binary = atob(dataURI.split(',')[1]);
 //   var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
 //   var array = [];
 //   for(var i = 0; i < binary.length; i++) {
 //     array.push(binary.charCodeAt(i));
 //   }
 //   return new Blob([new Uint8Array(array)], {type: mimeString});
 // };
 //
 //
     });
