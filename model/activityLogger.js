/*
 * ActivityLog Schema
 * @path model/activityLogger.js
 * @file  activityLogger.js
 * @Scripted By Salman M Khan
 */
'use strict';
/*
 * Module dependencies
 */

var express = require('express');
var mongoose = require('../config').mongoose;

var Schema = mongoose.Schema;
/**
 * @schema activityLoggerSchema
 * @description contain note activity details
 */
var activityLoggerschema = Schema({
  userId: {
    type: String,
  },
  message: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String
  }
});

activityLoggerschema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updatedAt = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.createdAt)
    this.createdAt = currentDate;

  next();
});

/**
 * activityLog - function for retrieve the activityLog from mongo
 *
 * @param  {String} userId userId of registered user
 * @param  {Object} cb     calllback send to api
 *
 */
activityLoggerschema.statics.activityLog = function(userId, cb) {
  this.find({
    userId: userId
  }, cb);
}



var activityLogger = mongoose.model('activityLog', activityLoggerschema);

module.exports = activityLogger;
