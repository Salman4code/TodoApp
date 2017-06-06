var express = require('express');
var router = express.Router();
var userModel = require("../model");
var fs = require("fs");

function upload(imagename, Image) {
  fs.writeFile('public/profilepicture/' + imagename, Image, {
    encoding: 'base64'
  }, function(err) {
    if (err) {
      console.log('error');
    } else {
      console.log('File created');
    }
  });
}
router.post('/:id', function(request, response) {



  var originalImage = request.body.Original.replace(/^data:image\/(png|jpeg);base64,/g, "");
  var cropppedImage = request.body.image.replace(/^data:image\/(png|jpeg);base64,/g, "");
  var croppedimagename = request.body.imagename + "_croppedimage.png";
  var originalimagename = request.body.imagename + "_originalimage.jpeg";
  upload(croppedimagename, cropppedImage);
  upload(originalimagename, originalImage);
  croppedimageurl = "profilepicture/" + croppedimagename;
  originalimageurl="profilepicture/" + originalimagename
  var imageurl={
    "croppedimage":croppedimageurl,
    "originalimage":originalimageurl
  }
  console.log(imageurl);
  var user_id = request.params.id;
  console.log(user_id);

  userModel.uploadProfileImage(user_id, imageurl, function(err, success) {
    if (success) {
      console.log(success);
      response.send({
        "status": "true",
        "message":"Profile image Successfully uploaded"
      });
    } else {
      response.send({
        "status": "false",
        "message": "Profile image upload failed"
      });
    }
  });





})

module.exports = router;
