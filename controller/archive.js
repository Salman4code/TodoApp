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

/**
 * router - description
 *
 * @param  {params} '/:id'            id contain noteId
 * @param  {object} function(request  contain object having archive and unarchive value to perform operation in schema
 * @param  {type} response            response give
 * @return {type}                  description
 */
router.post('/:id', function(request, response) {

  try {
    var id = request.params.id;
    var data = request.body;

    /**
     * userData - description
     *
     * @param  {String} id           noteId
     * @param  {Object} data         Object having archive and archive value fto perform operation in schema
     * @param  {type} function(err    calllback error from model
     * @param  {type} result       
     * @return {type}              description
     */
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
