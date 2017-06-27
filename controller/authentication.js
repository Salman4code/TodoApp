/*
* Authentication
* @path controller/authentication.js
* @file authentication.js
* @Scripted by Salman M Khan
*/
'use strict';

/*
* Module dependencies
*/


var express = require('express');
var router= express.Router();
var jwt=require("jsonwebtoken");
var secretkey = require('../config').TOKEN_SECRET;
var logger = require('winston');


//Middleware for Athentication from token

router.use(function(request,response,next){
// check header or url parameters or post parameters for token
  // var token = request.body.token || request.query.token || request.headers['x-access-token']||request.headers.cookie;

  var token=request.headers.cookie;
  console.log(token);
  try {
    //Geting the perfect token from headers of auth
    token=token.substr(4);
  } catch (e) {
    response.send({"status":false,"message":"login Please"});
    logger.error("message:login Please")
  }
  // decode token
  if (token) {
    // verifies secret and checks exp
    //Decodeing token with secret key usnig Jwt-token

    jwt.verify(token, secretkey, function(err, decoded) {
      if (err) {
        return response.send({ success: false, message: 'Failed to authenticate token.' });
        logger.error("Failed to authenticate token.")

      } else {
        // if everything is good, save to request for use in other routes
        request.decoded = decoded;
        //Going next the Api after authentication
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return response.status(403).send({
        success: false,
        message: 'No token provided.'
    });
    logger.error("No token provided.")
  }
  })
module.exports=router;
