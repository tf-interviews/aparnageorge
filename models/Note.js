const mongoose = require('mongoose');

//Schema for the Notes collection
const NoteSchema = new mongoose.Schema({
  // title for the note
  title: {
    type: String,
    required: [true, 'Title cannot be left blank.']
  },
  
  /* author of the note- this must be same as the unique userid 
  field from User collection*/
  author: {
    type: String,
    required: true
  },
  /* description for the note */
  description: {
    type: String
  },
  /* first published/created date for the note */
  published_date: {
    type: Date
  },
  /* last updated date for the note */
  updated_date: {
    type: Date,
    default: Date.now
  },
  /* Whether the note is archived or not(active). Defaults to false*/
  archived: {
    type: Boolean,
    default: false
  },
  /* Array of tags for the note for ease of operations */
  tags: {
    type: Array
  }
});

module.exports = Note = mongoose.model('note', NoteSchema);