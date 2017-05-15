var express = require('express');
var router = express.Router();
var UserData = require('../model/data_notes');



router.post('/', function(request, response) {
console.log("get_datarequest",request.decoded._id);
  UserData.get_data(request.decoded, function(err, result) {
    // console.log("get_data",result[0]._id);
    if (err) {
      response.send({
        "status": false,
        "message": err
      });
    } else {
      response.send({
        "status": true,
        "message": "success",
        "note_data":result
      });
    }

  })

})

module.exports = router;
