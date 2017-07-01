/**
 *@path controller/removeScrap.js
 * @file removeScrap.js
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



/**
 * router - post call for API get data from schema
 *
 * @param  {type} '/:id'            noteId of particular note
 * @param {Object} request          request having object containing note detail to perform some operation
 * @param  {Object} response        response having object with status and message
 */
router.post('/:id', function(request, response) {
  try {
    var scrapeId = request.body.scrapeId
    var id = request.params.id;
    userData.removeScrapdata(id, scrapeId, function(err, result) {
      console.log(result);
      if (err) {
        logger.info(err);
        response.send({
          "status": false,
          "message": "Unable to remove scrape"
        });
        logger.error("scrape error", err)
      } else {
        response.send({
          "status": true,
          "message": "success",
        });
        logger.info("Scrape removed Successfully")
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
