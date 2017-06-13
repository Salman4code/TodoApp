var express = require('express');
var mongoose = require('../config').mongoose;
var Schema = mongoose.Schema;

var noteSchema = Schema({
  userId: {
    type: String
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  createdAt: {
    type: Date,
    // default: Date.now
  },
  updatedAt: {
    type: Date,
    // default: Date.now
  },
  reminder: {
    type: Date
  },
  bgcolor:{
    type:String
  },
  archive:{
    type:Boolean
  },
  pin_note:{
    type:Boolean
  }
});


noteSchema.statics.saveNoteData = function(request, data_number, cb) {
  // console.log("save_data");
  // console.log("decode", data_number._id);
  var note_detail = new this({
    userId: data_number._id,
    title: request.title,
    content: request.content
  })

  note_detail.save(cb);
  // console.log("executed");

}

noteSchema.pre('save', function(next) {
  // get the current date
  // console.log("pre");
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updatedAt = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.createdAt)
    this.createdAt = currentDate;

  next();
});

noteSchema.statics.reminder = function(noteId, request, cb) {

  // console.log("update_data", noteId);
  this.update({
    _id: noteId
  }, {
    $set: {
      reminder: request.reminder
    }
  }, cb);

}
// noteSchema.pre('save', function(next){
//   var something = this;
//   this.updatedAt=new Date();
//   //  something.updatedAt(Date.now());
//    next();
// })

noteSchema.statics.getData = function(userId, cb) {

  // console.log("get_data", user_id);
  this.find({
    userId: userId
  }, cb);
}

noteSchema.statics.readSingleNote = function(noteId, cb) {

  // console.log("read_single_note", noteId);
  this.find({
    _id: noteId
  }, cb);
}


noteSchema.statics.update_data_notes = function(noteId, request, cb) {

  // console.log("update_data", noteId);
  this.update({
    _id: noteId
  }, {
    $set: {
      title: request.title,
      content: request.content
    }
  }, cb);
}

noteSchema.statics.deleteNote = function(noteId, cb) {
  // console.log("delete data");
  this.remove({
    _id: noteId
  }, cb);
}
noteSchema.statics.deleteReminder = function(noteId, cb) {
  // console.log("delete reminder");
  this.update({
    _id: noteId
  }, {
    $unset: {
      reminder: ""
    }
  }, cb);
}
noteSchema.statics.changeColor = function(noteId,request, cb) {
  // console.log("delete reminder");
  this.update({
    _id: noteId
  }, {
    $set: {
      bgcolor:request.bgcolor
    }
  }, cb);
}
noteSchema.statics.archiveNote= function(noteId,booleanvalue,cb) {
  // console.log("Archive val",booleanvalue);

  this.update({
    _id: noteId
  }, {
    $set: {
      archive:booleanvalue.value,
      pin_note:booleanvalue.pin
    }
  }, cb);
}

noteSchema.statics.pinnedNote= function(noteId,booleanvalue, cb) {
  // console.log("Boolean value",booleanvalue);
  // console.log("boolean",booleanvalue.removearchive);
  this.update({
    _id: noteId
  }, {
    $set: {
      archive:booleanvalue.removearchive,
      pin_note:booleanvalue.value
    }
  }, cb);
}

var dataSchema = mongoose.model('note_data', noteSchema);



module.exports = dataSchema;
