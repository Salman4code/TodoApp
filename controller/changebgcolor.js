/*
* change background-color of note
* @path controller/changebgcolor.js
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


//post call for API changing background-color of note

/**
 * router - post call for API changing background-color of note
 *
 * @param  {String} '/:id'           noteId of notes
 * @param  {Object} request           request having object with background-color code
 * @param  {type} response           response having status and message
 *
 */
router.post('/:id', function(request, response) {
  try {
    var id = request.params.id;
    userData.changeColor(id, request.body, function(err, result) {
      if (err) {
        response.send({
          "status": false,
          "message": "color not changed"
        });
        logger.error("color not changed", err)
      } else {
        response.send({
          "status": true,
          "message": "color changed Successfully",
          "updateresult": result

        });
        logger.info("cardcolor changed")
      }


    })
  } catch (error) {
    logger.error(error)
    response.send({
      "status": false,
      "message": "server error"
    })
  }
})

module.exports = router;
