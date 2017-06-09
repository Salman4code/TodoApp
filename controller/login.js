var express = require('express');
var app = express();
var router = express.Router();
// var validator = require('express-validator');
// app.use(validator());

var secretkey = require('../config').secret;
var cookie = require('cookie-parser')
var config=require('../config/error');
// app.use(cookie1());
// console.log(secretkey);
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
// app.use(cookie());
app.set('superSecret', secretkey); // secret variable
// app.use(validator());


login = require("../model");

router.post('/', function(request, response) {
  var result={};
  result.status=false;
  try {
    // console.log("try1",config.validationSchema.login);
   request.check(config.validationSchema.login);
   request.getValidationResult().then(function(isValid) {
    //  console.log("inside function");
     try {
      //  console.log("try2");
       if (!isValid.isEmpty()) {
        //  console.log("not empty");
         var errors = request.validationErrors(); // isValid = isValid.useFirstErrorOnly();
         throw errors[0].msg;
       }

  login.checklogin(request.body, function(err, success) {
    console.log("checklogin", success);

    try {
      console.log(success._id);
      if (success) {
        token = jwt.sign({_id: success._id}, app.get('superSecret'), {
          expiresIn: 60 * 60 * 24 // expires in 24 hours
        });

        response.cookie("key", token);
        console.log(token);
        response.send({
          "status": true,
          "message": "Successfully login",
          "token": token
        });
      }
      else {
        response.send({
          "status": false,
          "message": "Unauthorised User"
        });
      }
    }
    catch (e) {
      response.send({
        "status": false,
        "message": "Invalid Email or invalid Password",
        "exception":e
      })

    }

  })
} catch (e) {
    if (!config.checkSystemErrors(e)) {
      result.status = false;
      result.message = e;
    }
    response.status(401).send(result);
    return;
  }

})
}
catch(e){
  console.log("last catch");
  response.send({"status":false,"message":e})
}

})



module.exports = router;
