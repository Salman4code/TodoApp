/*
* Signup
* @path controller/signup.js
* @file signup.js
* @Scripted by Salman M Khan
*/
'use strict';
/*
* Module dependencies
*/

var express = require('express');
var router = express.Router();
var config=require('../config/error');
var signup = require("../model");
var logger = require('winston');

//Api for Signup

router.post('/', function(request, response) {
  var result={};
  result.status=false;
  try {
    request.check(config.validationSchema.SignupValidation);
    request.getValidationResult().then(function(isValid) {
      try {
        if (!isValid.isEmpty()) {
          var errors = request.validationErrors(); // isValid = isValid.useFirstErrorOnly();
          throw errors[0].msg;
        }
        signup.checkSignup(request, function(err, success) {
          if (err) {
            response.send({
              "status": false,
              "message": err
            })
            logger.error(err)

          } else {
            response.send({
              "status": true,
              "message": "Register Successfully"

            });
            logger.info("Register Successfully")

          }
        })
      } catch (err) {
        result.message="sorry server error"
        if (!config.checkSystemErrors(err)) {
          result.status = false;
          result.message = err;
        }
        response.status(401).send(result);
        return;
      }
    })
  } catch (err) {
    response.status(401).send("server error");
      logger.error("server error",err)
  }
})

module.exports = router;
