var express=require('express');
var router=express();
var logger = require('winston');

router.post('/',function(request,response){
  // console.log("logout");


  response.clearCookie("key");
  response.send({"status":true,"message":"logout"});
    logger.info("user logout")
})


module.exports=router;
