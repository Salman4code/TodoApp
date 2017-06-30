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
var cheerio = require('cheerio');// using cheerio for scraping the web content for weblink
var getUrls = require("get-urls");
//Api for adding new note
router.post('/', function(req, res) {
  // console.log(req.body.content);
  // var l=getUrls(req.body.content);
  // console.log("getUrls",l);
  var url = req.body;
  // console.log("check",url);
  try {
    //check for url if its is undefined then else part will execute
    if (url.url != undefined) {
      // console.log("from body",url.url);
      var arr=[];
      // for (var i = 0; i <url.url.length; i++) {
// }
          for (var i in url.url) {


      // var demourl=url.url[i].split('<');// removing some tag from url link
      var demourl=url.url[i];
      // console.log("single Url",demourl);
      request(demourl, function(error, response, html) { // request using url

        if (!error) {
          //if successful response then use cheerio to load html
          var $ = cheerio.load(html);
          var meta = $('meta')  // definig meta variable to access the meta tag from website
          var keys = Object.keys(meta) //Geting key of multiple meta present in website

          var ogImage;
          var ogTitle;
          var ogUrl;

          keys.forEach(function(key) { //using key find the property of meta and store in variable
            if (meta[key].attribs &&
              meta[key].attribs.property &&
              meta[key].attribs.property === 'og:title') {
              ogTitle = meta[key].attribs.content;
            }
          });

          keys.forEach(function(key) { //using key find the property of meta and store in variable
            if (meta[key].attribs &&
              meta[key].attribs.property &&
              meta[key].attribs.property === 'og:image') {
              ogImage = meta[key].attribs.content;
            }
          });

          keys.forEach(function(key) { //using key find the property of meta and store in variable
            if (meta[key].attribs &&
              meta[key].attribs.property &&
              meta[key].attribs.property === 'og:url') {
              ogUrl = meta[key].attribs.content;
            }
          });

          // console.log("Title", ogTitle);
          // console.log("imageurl", ogImage);
        }
        //craeting object for sending data in model and pass this object to model
        var obj = {
          'scrapeTitle': ogTitle,
          'scrapeImageurl': ogImage,
          'scrapeLinkurl': ogUrl
        };
        arr.push(obj);

        console.log("var",i);
        console.log("inside loop",arr.length);
        if(arr.length-1==i){

          console.log("inside if loop");
        userData.saveNoteData(req.body, req.decoded, arr, function(err, result) {

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
        return;
      }


      });
    }
    console.log("arr",arr);
    // userData.saveNoteData(req.body, req.decoded, obj, function(err, result) {
    //
    //   if (err) {
    //     res.send({
    //       "status": false,
    //       "message": err
    //     });
    //     logger.error(err);
    //   } else {
    //     res.send({
    //       "status": true,
    //       // "message": result
    //
    //
    //     });
    //     logger.info("Note Created")
    //   }
    //
    // })
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
