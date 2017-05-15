var express = require('express');
var router = express.Router();
var config=require('../config/error');
signup = require("../model");

router.post('/', function(request, response) {
  var result={};
  result.status=false;
  try {
    // console.log(config.validationSchema.SignupValidation);
    console.log(request.body);
    request.check(config.validationSchema.SignupValidation);
    request.getValidationResult().then(function(isValid) {
      try {
        console.log("try1");
        if (!isValid.isEmpty()) {
          console.log("not empty");
          var errors = request.validationErrors(); // isValid = isValid.useFirstErrorOnly();
          throw errors[0].msg;
        }
        signup.checksignup(request, function(err, success) {
          console.log(success);
          if (err) {
            response.send({
              "status": false,
              "message": err
            })
          } else {
            response.send({
              "status": true,
              "message": "Register Successfully"

            });
          }
        })
      } catch (e) {
        result.message="sorry server error"
        if (!config.checkSystemErrors(e)) {
          result.status = false;
          result.message = e;
        }
        console.log(result);
        response.status(401).send(result);
        return;
      }
    })
  } catch (e) {
    response.status(401).send("server error");

  }
})

module.exports = router;
