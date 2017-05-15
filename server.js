var express = require('express');
var mongoose = require('./config');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan')
var validator = require('express-validator');
// var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
// mongoose.connect(config.database); // connect to database
// app.set('superSecret', config.secret); // secret variable
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
app.use(validator());
app.use(require('./controller'));
app.use(morgan('dev'));


port = process.env.PORT || 8081;

app.listen(port, function() {
  console.log("Sever Started %d", port);
  // mongoose();
})



// var User   = require('./models/user'); // get our mongoose model
