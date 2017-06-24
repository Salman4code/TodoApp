var express = require('express');
var router = express.Router();
var userModel = require("../model");
var fs = require("fs");
var logger = require('winston');


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

  if (!fs.existsSync('public/profilepicture/'+request.params.id)){
      fs.mkdirSync('public/profilepicture/'+request.params.id);
  }

  var originalImage = request.body.Original.replace(/^data:image\/(png|jpeg);base64,/g, "");
  var cropppedImage = request.body.image.replace(/^data:image\/(png|jpeg);base64,/g, "");
  var croppedimagename = request.params.id+"/croppedimage.png";
  var originalimagename = request.params.id+"/originalimage.jpeg";
  upload(croppedimagename, cropppedImage);
  upload(originalimagename, originalImage);
  croppedimageurl ="profilepicture/"+croppedimagename;
  originalimageurl="profilepicture/"+originalimagename;
  var imageurl={
    "croppedimage":croppedimageurl,
    "originalimage":originalimageurl
  }
  var user_id = request.params.id;

  userModel.uploadProfileImage(user_id, imageurl, function(err, success) {
    if (success) {
      console.log(success);
      response.send({
        "status": "true",
        "message":"Profile image Successfully uploaded"
      });
        logger.info("Profile image Successfully uploaded")
    } else {
      response.send({
        "status": "false",
        "message": "Profile image upload failed"
      });
        logger.info("Profile image upload failed")
    }
  });





})

module.exports = router;
