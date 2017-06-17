var express = require('express');
var router = express.Router();
var app = express();

var config = require('../config');
var request = require('request');
User = require("../model");

// var jwt = require('jwt-simple');
var moment = require('moment');
var request = require('request');
// var facebookLogin=require('../model')
// var secretkey = require('../config').secret;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
// app.set('superSecret', secretkey); // secret variable



// function createJWT(user) {
//   console.log("JWT function", user);
//   var payload = {
//     sub: user._id,
//     iat: moment().unix(),
//     exp: moment().add(14, 'days').unix()
//   };
//
//   return jwt.encode(payload, config.TOKEN_SECRET);
// }
function createJWT(user){
  return jwt.sign({_id: user._id}, config.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}



router.post('/', function(req, res) {
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
          'facebook.facebookId': profile.id
        }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({
              message: 'There is already a Facebook account that belongs to you'
            });
          }
          var token = req.header('Authorization').split(' ')[1];
          // console.log(token);
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
            user.save(function() {
              var token = createJWT(user);
              res.cookie("key",token);

              res.send({
                token: token
              });
            });
          });
        });
      } else {

        // Step 3. Create a new user account or return an existing one.
        User.findOne({
          'facebook.facebookId': profile.id
        }, function(err, existingUser) {
          if (existingUser) {
            var token = createJWT(existingUser);
            res.cookie("key",token);
            return res.send({
              token: token
            });
          }
          var user = new User();
          user.facebook.facebookId = profile.id;
          user.facebook.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          user.facebook.displayName = profile.name;
          user.save(function() {
            var token = createJWT(user);
            res.cookie("key",token);
            res.send({
              token: token
            });
          });
       });
      }
    });
  });
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
