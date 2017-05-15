var express=require('express');
var router=express();

router.post('/',function(request,response){
  console.log("logout");


  response.clearCookie("key");
  response.send({"status":true,"message":"logout"});
})


module.exports=router;
