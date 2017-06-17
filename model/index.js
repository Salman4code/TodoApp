var express = require('express');
validators = require('mongoose-validators');
var mongoose = require('../config').mongoose;
var config = require('../config')
// var hooks = require('hooks')
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
// used to create, sign, and verify tokens
var Schema = mongoose.Schema;

var userDetailSchema = Schema({
  local: {
    userName: {
      type: String,
      // required: true,
      validate: validators.isAlpha()
    },
    userEmail: {
      type: String,
      // required: true,
      // unique: true,
      validate: validators.isEmail()
    },
    userMobile: {
      type: Number,
      // required: true,
      validate: validators.matches(/^[789]\d{9}$/)
    },
    userPassword: {
      type: String,
      // required: true
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


userDetailSchema.statics.checkSignup = function(request, cb) {
  // console.log("inside signup");
  // console.log("from front end",request.body);
  var password = encrypt(request.body.password);
  var userdetail = new this({
    local: {
      userName: request.body.username,
      userEmail: request.body.email,
      userMobile: request.body.mobile,
      userPassword: password
    }

  })

  userdetail.save(cb);
  console.log("executed");

}


userDetailSchema.statics.checkLogin = function(request, cb) {

  // console.log("inside login");
  // console.log(request.email);
  // console.log(request.password);
  var password = encrypt(request.password);
  // console.log(password);
  userSchema.findOne({
    'local.userEmail': request.email,
    'local.userPassword': password
  }, cb);
}

userDetailSchema.statics.userProfile = function(request, cb) {

  var UserId = request._id;
  userSchema.findById(UserId, cb)
}

userDetailSchema.statics.uploadProfileImage = function(id, imageurl, cb) {
  // console.log("upload",imageurl);
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
