/**
 * activityLog
 * @path controller/activityLog.js
 * @file activityLog.js
 * @Scripted by Salman M Khan
 */
'use strict';
/*
 * Module dependencies
 */

var express = require('express');
var router = express();
var logger = require('winston');
var userActivity = require('../model/activityLogger');


/**
 * router - API for Activity Logger
 *
 * @param  {String} '/:id'           userId of registered user
 * @param  {Object} function(request Contain Object with some details
 * @param  {Object} response            response conatain object with status and message
 *
 */
router.post('/:id', function(request, response) {
  console.log("activity");

  try {
    var userId = request.params.id; /**userId of registered user*/


    /**
     * userActivity - Schema for activityLog
     *
     * @param  {String} userId     userId of registered user
     * @param  {error} err contain error message coming from model schema
     * @param  {Object} result        callback contain result containing note detail
     */
    userActivity.activityLog(userId, function(err, result) {
      if (result) {
        response.send({
          "status": true,
          "message": "Activity Log",
          "activity": result
        });
        logger.info("Activity log")
      } else {
        response.send({
          "status": false,
          "message": "Failed to load"
        });
        logger.error(err)
      }
    })
  } catch (error) {
    response.send({
      "status": false,
      "message": "server error"
    });
    logger.error(error);
  }
})
module.exports = router;
