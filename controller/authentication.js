var express = require('express');
// var app=express();
var router= express.Router();
var jwt=require("jsonwebtoken");
var secretkey = require('../config').secret;
console.log(secretkey);



router.use(function(request,response,next){
// check header or url parameters or post parameters for token
  // var token = request.body.token || request.query.token || request.headers['x-access-token']||request.headers.cookie;
  var token=request.headers.cookie;
  console.log(request.headers.cookie);
  try {
    console.log(token);
    token=token.substr(4);
  } catch (e) {
    response.send({"status":false,"message":"login Please"});

  }
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, secretkey, function(err, decoded) {
      if (err) {
        return response.send({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        console.log("else");
        request.decoded = decoded;
        // console.log(decoded);
        // return response.send({status:false,"message":"success"})
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return response.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
  })
module.exports=router;
