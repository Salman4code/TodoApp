/**
 * pinnedNote
 * @path controller/pinned.js
 * @file pinned.js
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
 * router -API for pinnedNote
 *
 * @param  {type} '/:id'            noteId of particular note
 * @param {Object} request          request having object containing note detail to perform some operation
 * @param  {Object} response        response having object with status and message
 */
router.post('/:id', function(request, response) {

  try {
    var id = request.params.id;
    var data = request.body;
    userData.pinnedNote(id, data, function(err, result) {
      if (err) {
        response.send({
          "status": false,
          "message": "Profile image upload failed"
        });
        logger.error("Profile image upload failed",err)
      } else {
        response.send({
          "status": true,
          "message": "Note Successfully pinned",
          "updateresult": result

        });
        logger.info("Note Successfully pinned")
      }

    })
  } catch (error) {
    response.send({
      "status": false,
      "message": error
    });
    logger.error(error)
  }

})

module.exports = router;
