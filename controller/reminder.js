var express = require('express');
var router = express.Router();
var UserData = require('../model/data_notes');



router.post('/:id', function(request, response) {
console.log("reminder");

var id = request.params.id;
UserData.reminder(id, request.body, function(err, result) {
  console.log("result",result);
  if (err) {
    response.send({
      "status": false,
      "message": err
    });
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
  }


})
})

module.exports = router;
