var express = require('express');
var router = express.Router();
var userData = require('../model/dataNote');
var logger = require('winston');



router.post('/:id', function(request, response) {
// console.log(request.decoded);
  userData.readSingleNote(request.params.id, function(err, result) {
    // console.log(result);
    if (err) {
      response.send({
        "status": false,
        "message": err
      });
        logger.info(err)
    } else {
      response.send({
        "status": true,
        "message": result
      });
    }

  })

})

module.exports = router;
