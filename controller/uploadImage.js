/**
* uploadProfileImage
* @path controller/uploadImage.js
* @file uploadImage.js
* @Scripted by Salman M Khan
*/
'use strict';
/*
* Module dependencies
*/
var express = require('express');
var router = express.Router();
var userModel = require("../model");
var fs = require("fs");
var logger = require('winston');


/**
 * upload - function for converting image base64 to image.png
 *
 * @param  {String} imagename Name of image to saving
 * @param  {String} Image     base64 image
 *
 */
function upload(imagename, Image) {

  fs.writeFile('public/profilepicture/' + imagename, Image, {
    encoding: 'base64'   // encode image using base64 encoding technic
  }, function(err) {
    if (err) {
      logger.err(err);
    } else {
      logger.info("Image created for profile")
    }
  });
}

//Api for uploading profile pic

/**
 * router - description
 *
 * @param  {type} '/:id'            userId of registered user
 * @param {Object} request          request having object containing note detail to perform some operation
 * @param  {Object} response        response having object with status and message
 *
 */
router.post('/:id', function(request, response) {
try {
  if (!fs.existsSync('public/profilepicture/'+request.params.id)){ //if user directory is not available then create directory using userId
      fs.mkdirSync('public/profilepicture/'+request.params.id);
  }

  var originalImage = request.body.Original.replace(/^data:image\/(png|jpeg);base64,/g, ""); //replace unnecessary contain present in base64 image
  var cropppedImage = request.body.image.replace(/^data:image\/(png|jpeg);base64,/g, "");////replace unnecessary contain present in base64 image
  var croppedimagename = request.params.id+"/croppedimage.png";
  var originalimagename = request.params.id+"/originalimage.jpeg";
  // passing parameter to the upload function for conversion of base64 to normal image
  upload(croppedimagename, cropppedImage); // passing parameter for croppedImage
  upload(originalimagename, originalImage);// passing parameter for originalImage


  croppedimageurl ="profilepicture/"+croppedimagename; //Creating croppedimageurl  for save in mongoDB

  originalimageurl="profilepicture/"+originalimagename; //originalimageurl  for save in mongoDB

  //creating imageurl Object for passing in the model
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
        logger.error("Profile image upload failed")
    }
  });


} catch (error) {
  response.send({
    "status": "false",
    "message": "Profile image upload failed"
  });
    logger.error(error)
}


})

module.exports = router;
