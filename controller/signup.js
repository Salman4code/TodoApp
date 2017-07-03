/**
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

/**
 * router - Post call for Signup API
 *
 * @param {Object} request          request having object containing note detail to perform some operation
 * @param  {Object} response        response having object with status and message
 *
 */
router.post('/', function(request, response) {
  var result={};
  result.status=false;
  try {
    request.check(config.validationSchema.SignupValidation); //manually validate the user details using Valiadtion schema
    request.getValidationResult().then(function(isValid) {

      try {
        if (!isValid.isEmpty()) {
          //if any error found throw error message
          var errors = request.validationErrors(); // isValid = isValid.useFirstErrorOnly();
          throw errors[0].msg;
        }
        signup.checkSignup(request, function(err, success) {
          if (err) {
            response.send({
              "status": false,
              "message": "Registration Failed"
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
