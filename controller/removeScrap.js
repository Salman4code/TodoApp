/* @path controller/removeScrap.js
 * @file removeScrap.js
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


//post call for API get data from schema

router.post('/:id', function(request, response) {
  try {
    var id = request.params.id;
    userData.removeScrapdata(id, function(err, result) {
      if (err) {
        logger.info(err);
        response.send({
          "status": false,
          "message": err
        });
        logger.error("scrape error", err)
      } else {
        response.send({
          "status": true,
          "message": "success",
        });
        logger.info("getnote Successfully done")
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
