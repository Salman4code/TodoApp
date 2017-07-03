/**
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




/**
 * router - post call for API deleteReminder
 *
 * @param  {String} '/:id'           noteId of notes
 * @param  {Object} request           request having object with background-color code
 * @param  {type} response           response having status and message
 *
 */
router.post('/:id', function(request, response) {

try {
  userData.deleteReminder(request.params.id,function(err, result) {
    if (err) {
      response.send({
        "status": false,
        "message": "server error"
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
