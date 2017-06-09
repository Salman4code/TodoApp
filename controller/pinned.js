var express = require('express');
var router = express.Router();
var UserData = require('../model/data_notes');



router.post('/:id', function(request, response) {
  console.log(request.params.id);
  var id = request.params.id;
  var data=request.body;
  console.log("pinned",data);
  UserData.pinned_note(id,data,function(err, result) {
    if (err) {
      response.send({
        "status": false,
        "message": err
      });
    } else {
      response.send({
        "status": true,
        "message": "Note Successfully pinned",
        "updateresult": result

      });
    }

  })

})

module.exports = router;
