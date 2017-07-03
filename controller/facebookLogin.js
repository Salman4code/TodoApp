/*
 * FacebookLogin
 * @path controller/facebookLogin.js
 * @file facebookLogin.js
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

function createJWT(user) {
  return jwt.sign({
    _id: user._id
  }, config.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}


//post call for API facebookLogin

/**
 * router - post call for API facebookLogin
 *
 * @param  {Object} function(req request having object with background-color code
 * @param  {Object} res           response having status and message
 *
 */
router.post('/', function(req, res) {
  try {
    var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
    var params = {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: config.FACEBOOK_SECRET,
      redirect_uri: req.body.redirectUri
    };
    // Step 1. Exchange authorization code for access token.


    /**
     * request - description
     *
     * @param  {String} accessTokenUrl accessTokenUrl is for
     * @param  {Object} params          params contain object with field(code,clientId,client_secret,redirect_uri)
     * @param  {type} err               error contain error message
     * @param  {type} response          response from fb
     * @param  {type} accessToken       this token came from facebook
     *
     */
    request.get({
      url: accessTokenUrl,
      qs: params,
      json: true
    }, function(err, response, accessToken) {
      if (response.statusCode !== 200) {
        return res.status(500).send({
          message: accessToken.error.message
        });
      }
      // Step 2. Retrieve profile information about the current user.
      request.get({
        url: graphApiUrl,
        qs: accessToken,
        json: true
      }, function(err, response, profile) {
        if (response.statusCode !== 200) {
          return res.status(500).send({
            message: profile.error.message
          });
        }
        if (req.header('Authorization')) {
          //if Authorization is there then find user in schema using email id
          User.findOne({
            'email': profile.email
          }, function(err, existingUser) {
            //if user already registered with facebook account to app and  send 409 status and message
            if (existingUser) {
              return res.status(409).send({
                message: 'There is already a Facebook account that belongs to you'
              });
            }
            var token = req.header('Authorization').split(' ')[1]; // request Authorization code and store in token variable
            var payload = jwt.decode(token, config.TOKEN_SECRET); // decode token with secretkey
            // payload.sub contain userId of the registered user
            User.findById(payload.sub, function(err, user) {
              if (!user) {
                return res.status(400).send({
                  message: 'User not found'
                });
              }

              /**
               *  if user found then Retrieve data from fb and save
               */
              user.facebookId = profile.id;
              user.facebook.picture = user.facebook.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
              user.facebook.displayName = user.facebook.displayName || profile.name;
              user.email = profile.email;
              user.save(function() {
                var token = createJWT(user);
                res.cookie("key", token);

                res.send({
                  token: token,
                  "message": "login successful with facebook account"
                });
              });
            });
          });
        } else {

          // Step 3. Create a new user account or return an existing one.
          //if Authorization code not present in header then find user in schema using email id
          User.findOne({
            'email': profile.email

          }, function(err, existingUser) {
            //existingUser found then add facebook profile to registered user and save
            if (existingUser) {
              existingUser.facebook.facebookId = profile.id;
              existingUser.facebook.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
              existingUser.facebook.displayName = profile.name;
              existingUser.save(function(err, result) {
                if (err) {
                  res.send({
                    'status': false,
                    'message': 'Data not saved'
                  });
                  logger.error(err)
                }
              })
              var token = createJWT(existingUser); // createJWT token for authentication via cookie
              res.cookie("key", token); //saving token in cookies
              logger.info("login successful with facebook account")
              return res.send({
                token: token,
                "message": "login successful with facebook account"
              });

            }
            //if user is not registered with toApp the create new Account using facebook detail
            var user = new User();
            user.facebook.facebookId = profile.id;
            user.facebook.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
            user.facebook.displayName = profile.name;
            user.email = profile.email;
            user.save(function() {
              var token = createJWT(user); // createJWT token for authentication via cookie
              res.cookie("key", token); //saving token in cookies
              logger.info("Successfully registered with Facebook Acount")
              res.send({
                token: token,
                message: "Successfully registered with Facebook Acount"
              });

            });
          });
        }
      });
    });
  } catch (error) {
    response.send({
      "status": false,
      "message": 'server errorr please contact administrator'
    });
    logger.error(error)
  }

});

module.exports = router;
