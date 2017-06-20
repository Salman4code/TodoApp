var express = require('express');
var router = express.Router();
var userData = require('../model/dataNote');
var logger = require('winston');



router.post('/:id', function(request, response) {
// console.log("reminder");

var id = request.params.id;
userData.reminder(id, request.body, function(err, result) {
  // console.log("result",result);
  if (err) {
    response.send({
      "status": false,
      "message": err
    });
      logger.error("reminder not set");
  } else if (result.nModified == 0) {
    response.send({
      "status": false,
      "message": "Reminder not changed"
    });

  }
  else {
    response.send({
      "status": true,
      // "message": result
      "message": "Reminder Set Successfully",
      "updateresult": result
    });
    logger.info("Reminder Set Successfully")
  }


})
})

module.exports = router;
