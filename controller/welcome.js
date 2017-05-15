var express = require('express');
var router = express.Router();



router.get("/",function(request,response){
  if(request.headers.cookie===undefined)
  {
    response.send({"status":false,"message":"Please Login first"})
  }
  else
  response.send({"status":true,"message":"valid user"})
})































module.exports=router;
