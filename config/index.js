var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/todoDB';

mongoose.connect(mongoDB);

module.exports = {
  "mongoose": mongoose,
  // "secret": "myFirstKey",
  "algorithm": 'aes256', // or any other algorithm supported by OpenSSL
  "key": 'password',
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET',
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || 'c1d189e066c3870e51ad9fb85a2d8e52',
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'rZGCsYUXQtsK9BFJL8W7h3uL',

};

// module.exports=function(){
// console.log("Successfully connected to db");
// }
