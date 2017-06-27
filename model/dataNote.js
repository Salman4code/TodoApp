/*
 * note Schema
 * @path model/index.js
 * @file index.js
 */
'use strict';
/*
 * Module dependencies
 */
var express = require('express');
var mongoose = require('../config').mongoose;
var activityLogger = require('./activityLogger')
var Schema = mongoose.Schema;

/**
 * @schema noteSchema
 * @description contain note details
 */
var noteSchema = Schema({
  // scrap:[{
  //   scrapeLinkurl: {
  //     type: String
  //   },
  //   scrapeTitle: {
  //     type: String
  //   },
  //   scrapeImageurl: {
  //     type: String
  //   }
  // }],
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
  scrapeLinkurl: {
    type: String
  },
  scrapeTitle: {
    type: String
  },
  scrapeImageurl: {
    type: String
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
}
);

/**
 * Save Note
 *
 * @return {Error} err
 * @return {Note} Note
 * @api for public
 */

noteSchema.statics.saveNoteData = function(request, userId, data, cb) {
console.log("modal",data);
if(data==undefined)
{
  console.log("normal");
  var note_detail = new this({
    userId: userId._id,
    title: request.title,
    content: request.content
  })
  //sending callback to controller
  note_detail.save(cb);

}
else {
  console.log("url");
  var note_detail = new this({
    userId: userId._id,
    title: request.title,
    content: request.content,
    scrapeLinkurl: data.url,
    scrapeTitle: data.title,
    scrapeImageurl: data.imageUrl
  })
  //sending callback to controller
  note_detail.save(cb);
}
  var loggerDetail = new activityLogger({
    userId: userId,
    message: "New card added"
  });
  loggerDetail.save();
}


noteSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updatedAt = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.createdAt)
    this.createdAt = currentDate;

  next();
});

/**
 * Set remider for note
 *
 * @return {Error} err
 * @return {User} user
 * @api For reminder
 */
noteSchema.statics.reminder = function(noteId, request, cb) {
  this.findById({
    _id: noteId
  }, function(err,note) {
    if (note) {
      var userId = note.userId;
      note.reminder=request.reminder;
      //sending callback to controller
      note.save(cb);
      var loggerDetail = new activityLogger({
        userId: userId,
        'message': "Reminder set by user"
      });
      loggerDetail.save();
    }
  });
}
// noteSchema.pre('save', function(next){
//   var something = this;
//   this.updatedAt=new Date();
//   //  something.updatedAt(Date.now());
//    next();
// })

/**
 * List All data note
 *
 * @return {Error} err
 * @return {note} note
 * @api For getNote
 */
noteSchema.statics.getData = function(userId, cb) {

  this.find({
    userId: userId
  }, cb);

}

noteSchema.statics.readSingleNote = function(noteId, cb) {

  this.find({
    _id: noteId
  }, cb);

}
/**
 * update note of user
 *
 * @return {Error} err
 * @return {User} user
 * @api For updateNote
 */
noteSchema.statics.updateNote = function(noteId, request, cb) {
  this.findById({
    _id: noteId
  }, function(err,note) {
    if (note) {
       var userId = note.userId;
      note.title=request.title;
      note.content= request.content;
      note.save(cb);
      var loggerDetail = new activityLogger({
        userId: userId,
        'message': "Note updated by user"
      });
      loggerDetail.save();
    }
  });
  }

noteSchema.statics.deleteNote = function(noteId, request, cb) {

  this.findById({
    _id: noteId
  }, function(err, note) {
    if (note) {
      var userId = note.userId;
      if (request.noteValue == 'trashNote') {
          note.isDeleted=false,
          note.isTrashed=true,
          note.isPinned=false
        note.save(cb);

        var loggerDetail = new activityLogger({
         userId: userId,
          message: "Note Deleted By user"
        });
        loggerDetail.save();

      } else if (request.noteValue == 'restore') {
        note.isDeleted=false,
        note.isTrashed=false,
        note.save(cb);

      var loggerDetail = new activityLogger({
        userId: userId,
        message: "Note restore By user"
      });
        loggerDetail.save();
      } else {
        this.remove({
          _id: noteId
        }, cb);

      }
    }
    else {
      cb("note not found",null)
    }
  })
}
noteSchema.statics.deleteReminder = function(noteId, cb) {

  this.findById({
    _id: noteId
  }, function(err,note) {
    if (note) {
      var userId = note.userId;
      note.reminder="";
      note.save(cb);
      var loggerDetail = new activityLogger({
        userId: userId,
        'message': "Reminder Deleted by user"
      });
      loggerDetail.save();
    }
  });
}
noteSchema.statics.changeColor = function(noteId, request, cb) {

  this.findById({
    _id: noteId
  }, function(err, note) {
    if (note) {
    var userId = note.userId;
      note.bgcolor=request.bgcolor;
      note.save(cb);
      var loggerDetail = new activityLogger({
        userId: userId,
        'message': "Note color changed by user"
      });
      loggerDetail.save();
    }
  });
}
noteSchema.statics.archiveNote = function(noteId, booleanvalue, cb) {
  this.findById({
    _id:noteId
  },function (err,note) {
    if(note){
      var userId = note.userId;
      if (booleanvalue.archiveval == 'archiveNote') {
        note.isArchived=true,
        note.isPinned=false
        note.save(cb);
        var loggerDetail = new activityLogger({
          userId:userId,
          message: "Note Archived"
        });
        loggerDetail.save();
      } else {
        note.isArchived=false;
        note.isPinned=false;
        note.save(cb);
        var loggerDetail = new activityLogger({
          userId:userId,
          message: "Note UnArchived"
        });
        loggerDetail.save();
      }
    }

  })


  // this.update({
  //   _id: noteId
  // }, {
  //   $set: {
  //     isArchived: booleanvalue.value,
  //     isPinned: booleanvalue.pin
  //   }
  // }, cb);

}

noteSchema.statics.pinnedNote = function(noteId, booleanvalue, cb) {
  console.log(booleanvalue.pinValue);
  this.findById({
    _id:noteId
  },function (err,note) {
    if(note){
      var userId = note.userId;
      if (booleanvalue.pinValue == 'pinned') {
        note.isArchived=false,
        note.isPinned=true
        note.save(cb);
        var loggerDetail = new activityLogger({
          userId:userId,
          message: "Note pinned"
        });
        loggerDetail.save();
      } else {
        note.isPinned=false;
        note.save(cb);
        var loggerDetail = new activityLogger({
          userId:userId,
          message: "Note Unpin"
        });
        loggerDetail.save();
      }
    }

  })
  // this.update({
  //   _id: noteId
  // }, {
  //   $set: {
  //     isArchived: booleanvalue.removearchive,
  //     isPinned: booleanvalue.value
  //   }
  // }, cb);

}
noteSchema.statics.scrapeContent = function(data, request, cb) {
  console.log(data.url);
  console.log(request);
  // this.update({
  //   _id: noteId
  // }, {
  //   $set: {
  //     scrapeLinkurl:data.url,
  //     scrapeTitle: data.title,
  //     scrapeImageurl: data.imageUrl
  //   }
  // },cb)
  var note_detail = new this({
    userId: request._id,
    scrapeLinkurl: data.url,
    scrapeTitle: data.title,
    scrapeImageurl: data.imageUrl
  })

  note_detail.save(cb);


}



var dataSchema = mongoose.model('noteData', noteSchema);


module.exports = dataSchema;
