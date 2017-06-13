var express = require('express');
var router = express.Router();
var userData = require('../model/data_notes');
var logger = require('winston');



router.post('/:id', function(request, response) {
// console.log("changebgcolor");

var id = request.params.id;
userData.changeColor(id, request.body, function(err, result) {
  // console.log("result",result);
  if (err) {
    response.send({
      "status": false,
      "message": err
    });
    logger.error("color not changed",err)
  }
  else {
    response.send({
      "status": true,
      // "message": result
      "message": "color changed Successfully",
      "updateresult": result

    });
    logger.info("cardcolor changed")
  }


})
})

module.exports = router;
