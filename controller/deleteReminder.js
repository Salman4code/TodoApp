var express = require('express');
var router = express.Router();
var userData = require('../model/data_notes');
var logger = require('winston');



router.post('/:id', function(request, response) {

  // console.log("delete reminder call");

  userData.deleteReminder(request.params.id,function(err, result) {
    // console.log(result);
    if (err) {
      response.send({
        "status": false,
        "message": err
      });
      logger.error("Reminder error",err)
    } else {
      response.send({
        "status": true,
        "message": "Reminder deleted"
      });
      logger.info("Reminder deleted")
    }

  })

})

module.exports = router;
