/*
 * Creating Server
 * @path /server.js
 * @file server.js
 * @Scripted by Salman M khan
 */
'use strict';

/*ModuleModule
 * Module dependencies
 */

var express = require('express');
var mongoose = require('./config');
var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan');
var logger = require('winston');
var validator = require('express-validator');

// configure winston file for logger
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

// to access all the files from public folder
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());


app.use(validator());
// to access all the Controller on server start
app.use(require('./controller'));



var port = process.env.PORT || 8081;

//  Starting server with port 8081
app.listen(port, function() {
  console.log("Sever Started %d", port);
  logger.info("Server Started at port no %d",port)
})



// var User   = require('./models/user'); // get our mongoose model
