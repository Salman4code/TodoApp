var express = require('express');
validators = require('mongoose-validators');
var mongoose = require('../config').mongoose;
var config=require('../config')
// var hooks = require('hooks')
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
// used to create, sign, and verify tokens
var Schema = mongoose.Schema;

var userDetailSchema = Schema({
  userName: {
    type: String,
    required: true,
    validate: validators.isAlpha()
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
    validate: validators.isEmail()
  },
  userMobile: {
    type: Number,
    required: true,
    validate: validators.matches(/^[789]\d{9}$/)
  },
  userPassword: {
    type: String,
    required: true
  },
  CroppedImage:{
    type:String
  },
  OriginalImage:{
    type:String
  }
});


userDetailSchema.statics.checksignup = function(request, cb) {
  console.log("inside signup");
  console.log("from front end",request.body);
  var password = encrypt(request.body.password);
  var userdetail = new this({
    userName: request.body.username,
    userEmail: request.body.email,
    userMobile: request.body.mobile,
    userPassword: password
  })

  userdetail.save(cb);
  console.log("executed");

}


userDetailSchema.statics.checklogin = function(request, cb) {

  console.log("inside login");
  console.log(request.email);
  console.log(request.password);
  var password = encrypt(request.password);
  console.log(password);
  userSchema.findOne({
    userEmail: request.email,
    userPassword: password
  }, cb);
}

userDetailSchema.statics.userprofile=function(request,cb){

  var UserId=request._id;
  userSchema.findById(UserId,cb)
}

userDetailSchema.statics.uploadProfileImage=function(id,imageurl,cb){
console.log("upload",imageurl);
this.update({
    _id: id
  }, {
    $set: {
      CroppedImage:imageurl.croppedimage,
      OriginalImage:imageurl.originalimage
    }
  }, cb);
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
