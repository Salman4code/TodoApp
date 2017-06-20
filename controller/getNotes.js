var express = require('express');
var router = express.Router();
var userData = require('../model/dataNote');
var logger = require('winston');



router.post('/', function(request, response) {
// console.log("get_datarequest",request.decoded._id);
  userData.getData(request.decoded, function(err, result) {
    // console.log("get_data",result[0]._id);
    if (err) {
      logger.info(err);
      response.send({
        "status": false,
        "message": err
      });
      logger.error("getData error",err)
    } else {
      response.send({
        "status": true,
        "message": "success",
        "note_data":result
      });
      logger.info("getnote Successfully done")
    }

  })

})

module.exports = router;
