var express = require('express');
var router = express.Router();
var userData = require('../model/dataNote');
var logger = require('winston');



router.post('/:id', function(request, response) {
// console.log(request);
  console.log("delete Api call");
var id=request.params.id;
  userData.deleteNote(id,request.body,function(err, result) {
    console.log(result);
    if (err) {
      response.send({
        "status": false,
        "message": err
      });
      logger.error("Note not deleted")
    } else {
      response.send({
        "status": true,
        "message": result
      });
      logger.info("Note deleted Successfully")
    }

  })

})

module.exports = router;
