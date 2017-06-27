/*
 * User Schema
 * @path model/index.js
 * @file index.js
 *@Scripted by Salman M Khan
 */
'use strict';
/*
 * Module dependencies
 */


var express = require('express');
var validators = require('mongoose-validators');
var mongoose = require('../config').mongoose;
var config = require('../config')
var crypto = require('crypto');
var jwt = require('jsonwebtoken');// used to create, sign, and verify tokens
var Schema = mongoose.Schema;

/**
 * @schema userDetailSchema
 * @description contain User details
 */

var userDetailSchema = Schema({
  email: {
    type: String,
    unique: true
  },
  local: {
    userName: {
      type: String,
      validate: validators.isAlpha()
    },
    userMobile: {
      type: Number,
      validate: validators.matches(/^[789]\d{9}$/)
    },
    userPassword: {
      type: String,
    },
    croppedImage: {
      type: String
    },
    originalImage: {
      type: String
    }
  },
  facebook: {
    facebookId: String,
    displayName: String,
    picture: String

  },
  google: {
    googleId: String,
    displayName: String,
    picture: String
  }

});

/**
 * Register User
 *
 * @return {Error} err
 * @return {User} user
 * @api For signup
 */
userDetailSchema.statics.checkSignup = function(request, cb) {

  var password = encrypt(request.body.password);

  User.findOne({
    'email': request.body.email
  }, function(err, existingUser) {
    if (existingUser) {

      existingUser.local.userName = request.body.username,
        existingUser.local.userName = request.body.username,
        existingUser.local.userMobile = request.body.mobile,
        existingUser.local.userPassword = password

      existingUser.save(cb);
    } else {
      var userdetail = new User({
        email: request.body.email,
        local: {
          userName: request.body.username,
          userMobile: request.body.mobile,
          userPassword: password
        }

      });

      userdetail.save(cb);
    }
  })
}

/**
 * Find `User` by its email
 *
 * @param {String} email
 * @return {Error} err
 * @return {User} user
 * @api for login
 */
userDetailSchema.statics.checkLogin = function(request, cb) {
  var password = encrypt(request.password);
  userSchema.findOne({
    'email': request.email,
    'local.userPassword': password
  }, cb);
}

userDetailSchema.statics.userProfile = function(request, cb) {

  var UserId = request._id;
  userSchema.findById(UserId, cb)
}

userDetailSchema.statics.uploadProfileImage = function(id, imageurl, cb) {
  this.update({
    _id: id
  }, {
    $set: {
      'local.croppedImage': imageurl.croppedimage,
      'local.originalImage': imageurl.originalimage
    }
  }, cb);
}


userDetailSchema.statics.facebookLogin = function(profile, cb) {


  userSchema.findOne({
    facebook: profile.id
  }, function(err, existingUser) {
    if (existingUser) {
      // return res.status(409).send({
      //   message: 'There is already a Facebook account that belongs to you'
      // });
      // console.log("existing",local.originalImageUser);
      cb("existingUser", null)
    }
    // var token = req.header('Authorization').split(' ')[1];
    // console.log(token);
    // var payload = jwt.decode(token, config.TOKEN_SECRET);
    // userSchema.findById(payload.sub, function(err, user) {
    //   if (!user) {
    //     // return res.status(400).send({
    //   message: 'User not found'
    // });
    // console.log("User not found");
    // cb("User not found",err)
    // }
    var user = new User();
    user.facebook = profile.id;
    user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
    user.displayName = user.displayName || profile.name;
    user.save(cb);
    // {
    // var token = createJWT(user);
    // res.send({
    //   token: token
    // });
    // });
    // });
  });


}



var userSchema = mongoose.model('registration', userDetailSchema);


function encrypt(data) {
  var algorithm = config.algorithm; // or any other algorithm supported by OpenSSL
  var key = config.key;
  console.log("plain text:: ", data);
  var cipher = crypto.createCipher(algorithm, key);
  var encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
  console.log("encrypted text::", encrypted);
  return encrypted;

}
module.exports = userSchema;
