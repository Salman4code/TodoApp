var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var userData = require('../model/dataNote');
var logger = require('winston');


/**
 * router - description
 *
 * @param  {Object} request           Request Contain data for updation
 * @param  {Object} response          response contain object with status and message
 *
 */
router.post('/', function(req, res) {
  try {
  console.log("inside webpageScrapper1",req.body.url);
  var url=req.body.url;

  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      var meta = $('meta')
      var keys = Object.keys(meta)
      // console.log(keys);
      var ogImage;
      var ogTitle;

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
      'url':ogUrl
    };
    // var id = req.params.id;
    userData.scrapeContent(obj,req.decoded, function(err, success) {
      if (success) {
        res.send({
          "status": true,
          "message": success
        });
      } else {
        res.send({
          "status": false,
          "message": "failed to save data"
        })
      }
    })
  })

} catch (error) {
  res.send({
    "status": false,
    "message": "server error"
  })
  logger.error(error)
}

})


module.exports = router;
