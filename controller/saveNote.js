var express = require('express');
var router = express.Router();
var userData = require('../model/dataNote');
var logger = require('winston');
var request = require('request');
var cheerio = require('cheerio');


router.post('/', function(req, res) {
  // url=req.body.url;
  url = 'http://timesofindia.indiatimes.com/india/govt-announces-30-smart-cities-thiruvanathapuram-tops-list/articleshow/59280576.cms';
  request(url, function(error, response, html) {
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
     obj = {
      'title': ogTitle,
      'imageUrl': ogImage,
      'url':ogUrl
    };


  userData.saveNoteData(req.body,req.decoded,obj, function(err, result) {

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

})

module.exports = router;
