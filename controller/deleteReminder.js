/*
* DeleteReminder
* @path controller/deleteReminder.js
* @file deleteReminder.js
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



router.post('/:id', function(request, response) {

  // console.log("delete reminder call");
try {
  userData.deleteReminder(request.params.id,function(err, result) {
    // console.log(result);
    if (err) {
      response.send({
        "status": false,
        "message": err
      });
      logger.error("Reminder error",err)
    } else {
      response.send({
        "status": true,
        "message": "Reminder deleted"
      });
      logger.info("Reminder deleted")
    }

  })
} catch (error) {
  logger.error(error)
    response.send({"status":false,"message":error})
}


})

module.exports = router;
