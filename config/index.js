var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/Mydb';

mongoose.connect(mongoDB);

module.exports = {
  "mongoose": mongoose,
  "secret": "myFirstKey",
  "algorithm": 'aes256', // or any other algorithm supported by OpenSSL
  "key": 'password'
};

// module.exports=function(){
// console.log("Successfully connected to db");
// }
