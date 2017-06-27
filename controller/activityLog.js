/*
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
router.post('/:id', function(request, response) {
  console.log("activity");

  try {
    var userId=request.params.id; //userId of registered user
    userActivity.activityLog(userId,function(err,result){
      if(result){
      response.send({
        "status": true,
        "message": "Activity Log",
        "activity":result
      });
    }
    else {
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
module.exports=router;
