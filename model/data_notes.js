var express = require('express');
var mongoose = require('../config').mongoose;
var Schema = mongoose.Schema;

var data_notes_Schema = Schema({
  user_id: {
    type: String
  },
  title: {
    type: String
  },
  take_note: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


data_notes_Schema.statics.save_data = function(request, data_number, cb) {
  console.log("save_data");
  console.log("decode", data_number._id);
  var note_detail = new this({
    user_id: data_number._id,
    title: request.title,
    take_note: request.take_note
  })

  note_detail.save(cb);
  console.log("executed");

}
data_notes_Schema.pre('save', function(next){
  var something = this;
  this.updatedAt=new Date();
  //  something.updatedAt(Date.now());
   next();
})

data_notes_Schema.statics.get_data = function(user_id, cb) {

  console.log("get_data", user_id);
  this.find({
    user_id: user_id
  }, cb);
}

data_notes_Schema.statics.read_single_note = function(note_id, cb) {

  console.log("read_single_note", note_id);
  this.find({
    _id: note_id
  }, cb);
}


data_notes_Schema.statics.update_data_notes = function(note_id, request, cb) {

  console.log("update_data", note_id);
  this.update({
    _id: note_id
  }, {
    $set: {
      title: request.title,
      take_note: request.take_note
    }
  }, cb);
}

data_notes_Schema.statics.deletes_data_notes = function(note_id, cb) {
  console.log("delete data");
  this.remove({
    _id: note_id
  }, cb);
}


var dataSchema = mongoose.model('note_data', data_notes_Schema);



module.exports = dataSchema;
