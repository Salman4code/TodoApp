/*
* Archive data
* @path controller/archive.js
* @file archive.js
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


//post call for API archive
router.post('/:id', function(request, response) {

  try {
    var id = request.params.id;
    var data = request.body;
    userData.archiveNote(id, data, function(err, result) {
      if (err) {
        response.send({
          "status": false,
          "message": err
        });
        logger.error(err)
      } else {
        response.send({
          "status": true,
          "message": "Data Successfully Archieved",
          "updateresult": result

        });
        logger.info("Data Successfully Archieved")

      }

    })
  } catch (error) {
    response.send({
      "status": false,
      "message": error
    });
  }

})

module.exports = router;
