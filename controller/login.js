/*
* Login
* @path controller/login.js
* @file login.js
* @Scripted by Salman M Khan
*/
'use strict';
/*
* Module dependencies
*/
var express = require('express');
var app = express();
var router = express.Router();
var logger = require('winston');
var secretkey = require('../config').TOKEN_SECRET; // secret variable
var cookie = require('cookie-parser')
var config = require('../config/error');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var login = require("../model");

router.post('/', function(request, response) {
  var result = {};
  result.status = false;
  try {
    request.check(config.validationSchema.login);
    request.getValidationResult().then(function(isValid) {
      try {
        if (!isValid.isEmpty()) {
          var errors = request.validationErrors(); // isValid = isValid.useFirstErrorOnly();
          throw errors[0].msg;
        }

        login.checkLogin(request.body, function(err, success) {
          try {
            if (success) {
              token = jwt.sign({
                _id: success._id
              }, secretkey, {
                expiresIn: 60 * 60 * 24 // expires in 24 hours
              });

              response.cookie("key", token);

              logger.info("Successfully login")
              response.send({
                "status": true,
                "message": "Successfully login",
                "token": token
              });
            } else {

              response.send({
                "status": false,
                "message": "Unauthorised User"
              });
              logger.error("Unauthorised User")
            }
          } catch (err) {
            response.send({
              "status": false,
              "message": "Invalid Email or invalid Password",
              "error": err
            })
            logger.error("Invalid Email or invalid Password", err)


          }

        })
      } catch (err) {
        if (!config.checkSystemErrors(err)) {
          result.status = false;
          result.message = err;
        }
        response.status(401).send(result);
        return;
      }

    })
  } catch (err) {
    response.send({
      "status": false,
      "message": "server error"
    })
  }

})



module.exports = router;
