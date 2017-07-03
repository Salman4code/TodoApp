/**
 * updateNote
 * @path controller/updateNote.js
 * @file updateNote.js
 * @Scripted by Salman M Khan
 */
'use strict';
/**
 * Module dependencies
 */

var express = require('express');
var router = express.Router();
var userData = require('../model/dataNote');
var logger = require('winston');


/**Api for updating notes*/

/**
 * router - description
 *
 * @param  {Object} '/:id'            contain noteId of note
 * @param  {Object} request           Request Contain data for updation
 * @param  {Object} response          response contain object with status and message
 *
 */
router.post('/:id', function(request, response) {

  try {
    var id = request.params.id;

    /**
     * updateNote -
     *
     * @param  {String} id            noteId of particular note
     * @param  {Object} request.body  contain object with note detail for changes
     * @param  {Error} err            generate error result if some error occur
     * @param  {Object} result        result contain successful result reponse from calllback
     *
     */
    userData.updateNote(id, request.body, function(err, result) {
      if (err) {
        response.send({
          "status": false,
          "message": "Note not Updated"
        });
        logger.error(err)
      } else {
        response.send({
          "status": true,
          "message": "Data Successfully Updated"
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
