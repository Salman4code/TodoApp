/**
* logout
* @path controller/logout.js
* @file logout.js
* @Scripted by Salman M Khan
*/
'use strict';
/*
* Module dependencies
*/

var express = require('express');
var router = express();
var logger = require('winston');

/**
 * router - Api for logout
 *
 * @param  {Object} request          description
 * @param  {Object} response         response having object with status and message
 *
 */
router.post('/', function(request, response) {

  try {
    //clearCookie in cookie session
    response.clearCookie("key");
    response.send({
      "status": true,
      "message": "logout"
    });
    logger.info("user logout")
  } catch (error) {
    response.send({
      "status": false,
      "message": "server error"
    });
    logger.error(error);

  }
})


module.exports = router;
