var express = require('express');
var router = express.Router();
var UserData = require('../model/data_notes');



router.post('/', function(request, response) {

  UserData.save_data(request.body, request.decoded, function(err, result) {

    if (err) {
      response.send({
        "status": false,
        "message": err
      });
    } else {
      response.send({
        "status": true,
        "message": result
      });
    }

  })

})

module.exports = router;
