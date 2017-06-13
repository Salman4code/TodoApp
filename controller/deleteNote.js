var express = require('express');
var router = express.Router();
var userData = require('../model/data_notes');
var logger = require('winston');



router.post('/:id', function(request, response) {

  // console.log("delete Api call");

  userData.deleteNote(request.params.id,function(err, result) {
    console.log(result);
    if (err) {
      response.send({
        "status": false,
        "message": err
      });
      logger.error("note not deleted")
    } else {
      response.send({
        "status": true,
        "message": result
      });
      logger.info("note deleted")
    }

  })

})

module.exports = router;
