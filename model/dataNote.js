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
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  reminder: {
    type: Date,
  },
  bgcolor: {
    type: String,
    // default:white
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isTrashed: {
    type: Boolean,
    default: false
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
    userId: userId,
    // isDeleted:false
  }, cb);
}

noteSchema.statics.readSingleNote = function(noteId, cb) {

  this.find({
    _id: noteId
  }, cb);
}


noteSchema.statics.updateNote = function(noteId, request, cb) {

  this.update({
    _id: noteId,
    // isDeleted:false
  }, {
    $set: {
      title: request.title,
      content: request.content
    }
  }, cb);
}

noteSchema.statics.deleteNote = function(noteId, request, cb) {
  // console.log(request.deleteNote);
  // console.log(request.trashNote);
  if (request.deleteNote == true) {
    this.remove({
      _id: noteId
    }, cb);
  }
else {

    this.update({
      _id: noteId
    }, {
      $set: {
        isDeleted: request.deleteNote,
        isTrashed: request.trashNote,
        isPinned:false
        // reminder:false
      }
    }, cb);

  }


}
noteSchema.statics.deleteReminder = function(noteId, cb) {

  this.update({
    _id: noteId
  }, {
    $unset: {
      reminder: ""
    }
  }, cb);
}
noteSchema.statics.changeColor = function(noteId, request, cb) {

  this.update({
    _id: noteId
  }, {
    $set: {
      bgcolor: request.bgcolor
    }
  }, cb);
}
noteSchema.statics.archiveNote = function(noteId, booleanvalue, cb) {

  this.update({
    _id: noteId
  }, {
    $set: {
      isArchived: booleanvalue.value,
      isPinned: booleanvalue.pin
    }
  }, cb);
}

noteSchema.statics.pinnedNote = function(noteId, booleanvalue, cb) {

  this.update({
    _id: noteId
  }, {
    $set: {
      isArchived: booleanvalue.removearchive,
      isPinned: booleanvalue.value
    }
  }, cb);
}

var dataSchema = mongoose.model('noteData', noteSchema);



module.exports = dataSchema;
