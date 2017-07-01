/**
* Get Note
* @path controller/getNotes.js
* @file changebgcolor.js
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
 * router - post call for API get data from schema
 *
 * @param  {Object} request          request contain Object with
 * @param  {Object} response         response having object with status and message
 *
 */
router.post('/', function(request, response) {
  try {
  userData.getData(request.decoded, function(err, result) {
    if (err) {
      logger.info(err);
      response.send({
        "status": false,
        "message": err
      });
      logger.error("getData error",err)
    } else {
      response.send({
        "status": true,
        "message": "success",
        "note_data":result
      });
      logger.info("getnote Successfully done")
    }

  })
} catch (error) {
  logger.error(error)
    response.send({"status":false,"message":error})
}

})

module.exports = router;
