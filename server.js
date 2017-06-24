var express = require('express');
var mongoose = require('./config');
var app = express();
// var fs = require('fs');
// var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var logger = require('winston');
var validator = require('express-validator');

logger.configure({
  transports: [
    new(logger.transports.File)({
      name: 'error',
      level: 'error',
      filename: 'error.log'
    }),
    new(logger.transports.File)({
      name: 'info',
      level: 'info',
      filename: 'access.log'
    })
  ]
});

app.use(morgan('dev'));
app.use(bodyParser.json({
  limit: '10mb'
}));
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());


app.use(validator());
app.use(require('./controller'));



port = process.env.PORT || 8081;

app.listen(port, function() {
  console.log("Sever Started %d", port);
  logger.info("Server Started at port no %d",port)
})



// var User   = require('./models/user'); // get our mongoose model
