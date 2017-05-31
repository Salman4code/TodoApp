var express = require('express');
var router = express.Router();
var userModel = require("../model");



// router.get("/",function(request,response){
//   if(request.headers.cookie===undefined)
//   {
//     response.send({"status":false,"message":"Please Login first"})
//   }
//   else
//   response.send({"status":true,"message":"valid user"})
// })




router.get('/', function(request, response) {

  userModel.userprofile(request.decoded, function(err, user) {
    console.log(request.decoded);
    if (user) {
      console.log(user);
      response.send({
        "status": true,
        "message":"Valid User",
        "userprofile": user
      });
    } else {
      response.send({
        "status": "false",
        "message": "not found"
      });
    }


  })

});

module.exports = router;


























module.exports=router;
