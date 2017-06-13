var express = require('express');
var router = express.Router();
var userData = require('../model/data_notes');
var logger = require('winston');



router.post('/:id', function(request, response) {
  // console.log(request.params.id);
  var id = request.params.id;
  var data=request.body;
  // console.log("pinned",data);
  userData.pinnedNote(id,data,function(err, result) {
    if (err) {
      response.send({
        "status": false,
        "message": err
      });
        logger.error("Profile image upload failed")
    } else {
      response.send({
        "status": true,
        "message": "Note Successfully pinned",
        "updateresult": result

      });
        logger.info("Note Successfully pinned")
    }

  })

})

module.exports = router;
