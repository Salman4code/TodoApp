var express = require('express');
var router = express.Router();
var userModel = require("../model");


router.post('/', function(request, response) {

  userModel.userprofile(request.decoded, function(err, user) {
    console.log(request.decoded);
    if (user) {
      console.log(user);
      response.send({
        "status": "true",
        "userprofile": user
      });
    } else {
      response.send({
        "status": "false",
        "message": "not found"
      });
    }


  })

});


module.exports = router;
