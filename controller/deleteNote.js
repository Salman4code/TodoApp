/*
* Delete Note
* @path controller/deleteNote.js
* @file deleteNote.js
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
  // console.log(request);
  console.log("delete Api call");
  var id = request.params.id;
  try {
    userData.deleteNote(id, request.body, function(err, result) {
      console.log(result);
      if (err) {
        response.send({
          "status": false,
          "message": err
        });
        logger.error("Note not deleted")
      } else {
        response.send({
          "status": true,
          "message": result
        });
        logger.info("Note deleted Successfully")
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
