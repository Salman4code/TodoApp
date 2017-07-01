/**
* Google Login
* @path controller/googleLogin.js
* @file googleLogin.js
* @Scripted by Salman M Khan
*/
'use strict';
/*
* Module dependencies
*/

var express = require('express');
var router = express.Router();
var app = express();

var config = require('../config');
var request = require('request');
var User = require("../model");

var moment = require('moment');
var request = require('request');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var logger = require('winston');


function createJWT(user) { //jwt function for creating token using user._id
  return jwt.sign({
    _id: user._id
  }, config.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}

/**
 * router - post call for API googleLogin
 *
 * @param  {Object} req           request having object with background-color code
 * @param  {Object} res           response having status and message
 *
 */
router.post('/', function(req, res) {
  try {
  var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.GOOGLE_SECRET,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };

  // Step 1. Exchange authorization code for access token.

  /**
   * request - description
   *
   * @param  {String} accessTokenUrl accessTokenUrl is for
   * @param  {Object} params          params contain object with field(code,clientId,client_secret,redirect_uri,grant_type)
   * @param  {type} err               err contain error message
   * @param  {type} response          response from google
   * @param  {type} token             this token came from google
   *
   */
  request.post(accessTokenUrl, {
    json: true,
    form: params
  }, function(err, response, token) {
    var accessToken = token.access_token;
    var headers = {
      Authorization: 'Bearer ' + accessToken
    };

    // Step 2. Retrieve profile information about the current user.
    request.get({
      url: peopleApiUrl,
      headers: headers,
      json: true
    }, function(err, response, profile) {
      if (profile.error) { //if profile not found  send errorMessage
        return res.status(500).send({
          message: profile.error.message
        });
      }
      // Step 3a. Link user accounts.
      if (req.header('Authorization')) {
        //if header contain Authorization code then find user using google email id in schema of todoApp
        User.findOne({
          'email': profile.email
        }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({
              message: 'There is already a Google account that belongs to you'
            });
          }

          var token = req.header('Authorization').split(' ')[1];// request Authorization code and store in token variable
          var payload = jwt.decode(token, config.TOKEN_SECRET);// decode token with secretkey
          // payload.sub contain userId of the registered user
          User.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({
                message: 'User not found'
              });
            }
            //if user found in schema then save data of google profile
            user.google.googleId = profile.sub;
            user.google.picture = user.google.picture || profile.picture.replace('sz=50', 'sz=200');
            user.google.displayName = user.google.displayName || profile.name;
            user.email = profile.email;
            user.save(function() {

              var token = createJWT(user);// createJWT token for authentication via cookie
              res.cookie("key", token);//saving token in cookies
              res.send({
                message: "upper",
                token: token
              });
            });
          });
        });
      } else {

        // Step 3b. Create a new user account or return an existing one.
        User.findOne({
          'email': profile.email
        }, function(err, existingUser) {
          //existingUser found then add google profile to registered user and save
          if (existingUser) {
            existingUser.google.googleId = profile.sub;
            existingUser.google.picture = profile.picture.replace('sz=50', 'sz=200');
            existingUser.google.displayName = profile.name;
            existingUser.save(function(err, result) {
              if (err) {
                res.send({
                  'status': false,
                  'message': 'Data not saved'
                });
                logger.error(err)
              }
            })
            var token = createJWT(user);// createJWT token for authentication via cookie
            res.cookie("key", token);//saving token in cookies

            return res.send({
              token: token,
              "message":"Google Data Saved Successfully"
            });
          }
          //if user is not registered with toApp the create new Account using google detail
          var user = new User();
          user.google.googleId = profile.sub;
          user.google.picture = profile.picture.replace('sz=50', 'sz=200');
          user.google.displayName = profile.name;
          user.email = profile.email;

          user.save(function(err, result) {
            var token = createJWT(user);// createJWT token for authentication via cookie
            res.cookie("key", token);//saving token in cookies
            res.send({
              message: "lower",
              token: token
            });
          });
        });
      }
    });
  });
} catch (error) {
  response.send({
    "status": false,
    "message": error
  });
    logger.error(error)
}
});
module.exports = router;
