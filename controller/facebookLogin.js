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
    request.get({
      url: accessTokenUrl,
      qs: params,
      json: true
    }, function(err, response, accessToken) {
      // console.log(response.statusCode);
      // console.log(accessToken);
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
          User.findOne({
            'email': profile.email
          }, function(err, existingUser) {
            if (existingUser) {
              return res.status(409).send({
                message: 'There is already a Facebook account that belongs to you'
              });
            }
            var token = req.header('Authorization').split(' ')[1];
            var payload = jwt.decode(token, config.TOKEN_SECRET);
            User.findById(payload.sub, function(err, user) {
              if (!user) {
                return res.status(400).send({
                  message: 'User not found'
                });
              }
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
          User.findOne({
            'email': profile.email

          }, function(err, existingUser) {
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
              var token = createJWT(existingUser);
              res.cookie("key", token);
              logger.info("login successful with facebook account")
              return res.send({
                token: token,
                "message": "login successful with facebook account"
              });

            }
            var user = new User();
            user.facebook.facebookId = profile.id;
            user.facebook.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
            user.facebook.displayName = profile.name;
            user.email = profile.email;
            user.save(function() {
              var token = createJWT(user);
              res.cookie("key", token);
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

// router.post('/', function(req, res) {
//   var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
//   var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
//   var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
//   var params = {
//     code: req.body.code,
//     client_id: req.body.clientId,
//     client_secret: config.FACEBOOK_SECRET,
//     redirect_uri: req.body.redirectUri
//   };
//   // Step 1. Exchange authorization code for access token.
//   request.get({
//     url: accessTokenUrl,
//     qs: params,
//     json: true
//   }, function(err, response, accessToken) {
//     console.log(response.statusCode);
//     console.log(accessToken);
//     if (response.statusCode !== 200) {
//       // return res.status(500).send({
//       //   message: accessToken.error.message
//       // });
//     }
//
//     // Step 2. Retrieve profile information about the current user.
//     request.get({
//       url: graphApiUrl,
//       qs: accessToken,
//       json: true
//     }, function(err, response, profile) {
//       if (response.statusCode !== 200) {
//         // return res.status(500).send({
//         //   message: profile.error.message
//         // });
//       }
//       if (req.header('Authorization')) {
//         // var token = req.header('Authorization').split(' ')[1];
//         // var payload = jwt.decode(token, config.TOKEN_SECRET);
//         User.facebookLogin(profile, function(err, success) {
//           if (err) {
//             res.send({
//               "status": false,
//               "message": "Data not Saved",err
//             })
//           } else {
//             res.send({
//               "status": true,
//               "message": "Data Saved Successfully"
//             })
//             console.log("Data Saved");
//           }
//         })
//       } else {
//         User.facebookLogin(profile, function(err, success) {
//           if (err) {
//             res.send({
//               "status": false,
//               "message": "Data not Saved1",err
//             })
//           } else {
//             res.send({
//               "status": true,
//               "message": "Data Saved Successfully"
//             })
//             console.log("Data Saved");
//           }
//         })
//       }
//     });
//   });
// });
module.exports = router;
