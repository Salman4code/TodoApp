/*
 * Save Note data
 * @path controller/saveNote.js
 * @file saveNote.js
 * @Scripted by Salman M Khan
 */
'use strict';
/*
 * Module dependencies
 */

var express = require('express');
var router = express.Router();
var userData = require('../model/dataNote');
var logger = require('winston');
var request = require('request');
var cheerio = require('cheerio');

//Api for adding card

router.post('/', function(req, res) {
  var url = req.body;
  // console.log("check",url);
  try {
    if (url.url != undefined) {
      for (var i = 0; i <url.url.length; i++) {
// }
      var demourl=url.url[i].split('<');
      demourl=demourl[i];
      request(demourl, function(error, response, html) {
        if (!error) {
          var $ = cheerio.load(html);
          var meta = $('meta')
          var keys = Object.keys(meta)
          // console.log(keys);
          var ogImage;
          var ogTitle;
          var ogUrl;

          keys.forEach(function(key) {
            if (meta[key].attribs &&
              meta[key].attribs.property &&
              meta[key].attribs.property === 'og:title') {
              ogTitle = meta[key].attribs.content;
            }
          });

          keys.forEach(function(key) {
            if (meta[key].attribs &&
              meta[key].attribs.property &&
              meta[key].attribs.property === 'og:image') {
              ogImage = meta[key].attribs.content;
            }
          });

          keys.forEach(function(key) {
            if (meta[key].attribs &&
              meta[key].attribs.property &&
              meta[key].attribs.property === 'og:url') {
              ogUrl = meta[key].attribs.content;
            }
          });

          console.log("Title", ogTitle);
          console.log("imageurl", ogImage);
        }
        var obj = {
          'title': ogTitle,
          'imageUrl': ogImage,
          'url': ogUrl
        };

        userData.saveNoteData(req.body, req.decoded, obj, function(err, result) {

          if (err) {
            res.send({
              "status": false,
              "message": err
            });
            logger.error(err);
          } else {
            res.send({
              "status": true,
              "message": result
            });
            logger.info("Note Created")
          }

        })
      });
    }
    } else {
      var obj = undefined;
      userData.saveNoteData(req.body, req.decoded, obj, function(err, result) {

        if (err) {
          res.send({
            "status": false,
            "message": err
          });
          logger.error(err);
        } else {
          res.send({
            "status": true,
            "message": result
          });
          logger.info("Note Created")
        }

      })
    }

  } catch (err) {
    res.send({
      "status": false,
      "message": err
    });
    logger.error(err);
  }

})

module.exports = router;
