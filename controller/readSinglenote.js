/*
* readSingleNote for updation
* @path controller/readSinglenote.js
* @file readSinglenote.js
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

try {
  userData.readSingleNote(request.params.id, function(err, result) {
    if (err) {
      response.send({
        "status": false,
        "message": err
      });
        logger.info(err)
    } else {
      response.send({
        "status": true,
        "message": result
      });
    }

  })
} catch (error) {
  response.send({
    "status": false,
    "message": error
  });
    logger.info(error)
}

})

module.exports = router;
