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
  // userdetail.save(function(err, data) {
  //   if (err) {
  //     cb(err, null);
  //   } else {
  //     cb(null, "Successfully registered")
  //   }
  // });
  // userdetail.pre('save',function(next){
  //   var date=new Date();
  //   console.log(date);
  //   // next();
  // })

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
  // userSchema.findOne({
  //   userEmail: request.body.email
  // }, function(err, docs) {
  //   console.log(docs);
  //   if (docs) {
  //     console.log(docs.userPassword);
  //
  //     var password = decrypt(docs.userPassword);
  //     console.log(password);
  //     console.log(request.body.password);
  //     if (request.body.password == password) {
  //       token = jwt.sign(docs, app.get('superSecret'), {
  //         expiresIn: 60 * 60 * 24 // expires in 24 hours
  //       });
  //
  //       cb(null, "login Successfully",token);
  //     } else {
  //       cb(err, null);
  //     }
  //   } else {
  //     cb(err, "Email_id is not registered with us");
  //   }
  // })
}

userDetailSchema.statics.userprofile=function(request,cb){

  var UserId=request._id;
  userSchema.findById(UserId,cb)
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
