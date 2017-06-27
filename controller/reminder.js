
/*
*  Set Reminder
* @path controller/reminder.js
* @file reminder.js
* @Scripted by Salman M Khan
*/
'use strict';
/*
* Module dependencies
*/
var express = require('express');
var router = express.Router();
var userData = require('../model/dataNote');
var logger = require('winston');


//Api for set reminder
router.post('/:id', function(request, response) {
try {

var id = request.params.id;
userData.reminder(id, request.body, function(err, result) {
  if (err) {
    response.send({
      "status": false,
      "message": err
    });
      logger.error("reminder not set",err);
  } else if (result.nModified == 0) {
    response.send({
      "status": false,
      "message": "Reminder not changed"
    });

  }
  else {
    response.send({
      "status": true,
      "message": "Reminder Set Successfully",
      "updateresult": result
    });
    logger.info("Reminder Set Successfully")
  }


})
} catch (error) {
  response.send({
    "status": false,
    "message": "server error"
  });
    logger.error("reminder error",error);
}

})

module.exports = router;
