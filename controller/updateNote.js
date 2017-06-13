var express = require('express');
var router = express.Router();
var UserData = require('../model/data_notes');
var logger = require('winston');



router.post('/:id', function(request, response) {
  // console.log(request.params.id);
  var id = request.params.id;
  UserData.update_data_notes(id, request.body, function(err, result) {
    // console.log("result",result);
    if (err) {
      response.send({
        "status": false,
        "message": err
      });
        logger.error(err)
    } else if (result.nModified == 0) {
      response.send({
        "status": false,
        "message": "Data not modified"
      });
    } else {
      response.send({
        "status": true,
        // "message": result
        "message": "Data Successfully Updated",
        "updateresult": result

      });
        logger.info("Note Successfully Updated")
    }

  })

})

module.exports = router;
