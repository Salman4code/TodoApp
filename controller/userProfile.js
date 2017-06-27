/*
* userProfile
* @path controller/userProfile.js
* @file userProfile.js
* @Scripted by Salman M Khan
*/
'use strict';
/*
* Module dependencies
*/
var express = require('express');
var router = express.Router();
var userModel = require("../model");
var logger = require('winston');

//Api for user profile 
router.get('/', function(request, response) {
try {
  userModel.userProfile(request.decoded, function(err, user) {
    // console.log(request.decoded);
    if (user) {
      // console.log(user);
      response.send({
        "status": true,
        "message":"Valid User",
        "userprofile": user
      });
        logger.info("valid User")
    } else {
      response.send({
        "status": "false",
        "message": "not found"
      });
        logger.error("user not found")
    }


  })
} catch (error) {
  response.send({
    "status": "false",
    "message": "not found"
  });
    logger.error(error)
}
});

module.exports = router;


























module.exports=router;
