var express = require('express');
var router = express.Router();
var UserData = require('../model/data_notes');



router.post('/:id', function(request, response) {
console.log("changebgcolor");

var id = request.params.id;
UserData.changecolor(id, request.body, function(err, result) {
  console.log("result",result);
  if (err) {
    response.send({
      "status": false,
      "message": err
    });
  }
  else {
    response.send({
      "status": true,
      // "message": result
      "message": "color changed Successfully",
      "updateresult": result

    });
  }


})
})

module.exports = router;
