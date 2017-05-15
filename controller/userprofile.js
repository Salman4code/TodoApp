var express = require('express');
var router = express.Router();
var userModel = require("../model");


router.post('/', function(request, response) {

  userModel.userprofile(request.decoded, function(err, user) {

    if (user) {
      console.log(user);
      response.send(user);
    } else {
      response.send("not found");
    }


  })

});


module.exports = router;
