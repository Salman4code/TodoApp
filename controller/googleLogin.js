var express = require('express');
var router = express.Router();
var app = express();

var config = require('../config');
var request = require('request');
User = require("../model");

// var jwt = require('jwt-simple');
var moment = require('moment');
var request = require('request');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

// function createJWT(user) {
//   console.log("JWT function", user._id);
//   var payload = {
//     sub: user._id,
//     iat: moment().unix(),
//     exp: moment().add(14, 'days').unix()
//   };
//   return jwt.encode(payload, config.TOKEN_SECRET);
// }
function createJWT(user){
  return jwt.sign({_id: user._id}, config.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}

router.post('/', function(req, res) {
  var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.GOOGLE_SECRET,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };
console.log(params);
  // Step 1. Exchange authorization code for access token.
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
      if (profile.error) {
        return res.status(500).send({
          message: profile.error.message
        });
      }
      // Step 3a. Link user accounts.
      if (req.header('Authorization')) {
        User.findOne({
          'google.googleId': profile.sub
        }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({
              message: 'There is already a Google account that belongs to you'
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
            user.google.googleId = profile.sub;
            user.google.picture = user.google.picture || profile.picture.replace('sz=50', 'sz=200');
            user.google.displayName = user.google.displayName || profile.name;
            user.save(function() {

              var token = createJWT(user);
              res.cookie("key",token);
              res.send({
                message:"upper",
                token: token
              });
            });
          });
        });
      } else {
        console.log("in else of google");

        // Step 3b. Create a new user account or return an existing one.
        User.findOne({
          'google.googleId': profile.sub
        }, function(err, existingUser) {
          if (existingUser) {
            return res.send({
              token: createJWT(existingUser._id)
            });
          }
          var user = new User();
          user.google.googleId = profile.sub;
          user.google.picture = profile.picture.replace('sz=50', 'sz=200');
          user.google.displayName = profile.name;
          user.save(function(err,result) {
            console.log("error",err,"result",result);
            var token = createJWT(user);
            res.cookie("key",token);

            res.send({
              message:"lower",
              token: token
            });
          });
        });
      }
    });
  });
});
module.exports = router;
