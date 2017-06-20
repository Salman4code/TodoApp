var express = require('express');
var router = express.Router();
var userData = require('../model/dataNote');
var logger = require('winston');



router.post('/', function(request, response) {

  userData.saveNoteData(request.body, request.decoded, function(err, result) {

    if (err) {
      response.send({
        "status": false,
        "message": err
      });
        logger.error(err);
    } else {
      response.send({
        "status": true,
        "message": result
      });
        logger.info("Note Created")
    }

  })

})

module.exports = router;
