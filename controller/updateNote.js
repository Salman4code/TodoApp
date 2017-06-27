/*
* updateNote
* @path controller/updateNote.js
* @file updateNote.js
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


//Api for updating notes

router.post('/:id', function(request, response) {

try {
  var id = request.params.id;
  userData.updateNote(id, request.body, function(err, result) {
    if (err) {
      response.send({
        "status": false,
        "message": err
      });
        logger.error(err)
    } else if (result.nModified == 0) {
      response.send({
        "status": false,
        "message": "Data not modified"
      });
    } else {
      response.send({
        "status": true,
        "message": "Data Successfully Updated",
        "updateresult": result

      });
        logger.info("Note Successfully Updated")
    }

  })
} catch (err) {
  response.send({
    "status": false,
    "message": err
  });
    logger.error(err)
}

})

module.exports = router;
