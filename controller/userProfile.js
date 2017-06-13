var express = require('express');
var router = express.Router();
var userModel = require("../model");
var logger = require('winston');


router.post('/', function(request, response) {

  userModel.userProfile(request.decoded, function(err, user) {
    // console.log(request.decoded);
    if (user) {
      console.log(user);
      response.send({
        "status": "true",
        "userprofile": user
      });
  // logger.info("")
    } else {
      response.send({
        "status": "false",
        "message": "not found"
      });
        logger.error("Profile not found")
    }


  })

});


module.exports = router;
