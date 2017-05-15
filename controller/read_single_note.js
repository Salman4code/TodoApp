var express = require('express');
var router = express.Router();
var UserData = require('../model/data_notes');



router.post('/:id', function(request, response) {
// console.log(request.decoded);
  UserData.read_single_note(request.params.id, function(err, result) {
    console.log(result);
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
