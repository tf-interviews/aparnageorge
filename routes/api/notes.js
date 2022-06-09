const express = require('express');
const router = express.Router();

// Load Notes model
const Note = require('../../models/Note');
// Load Notes Controller
var note = require('../../controllers/api/notesController');

/* @route GET api/notes/:author
@description Get all notes by userid that aren't archived
@access Public */
router.route('/:author')
  .get(note.activenotes)


/* @route GET api/notes/archived/:author
@description Get all archived notes by userid
@access Public */
router.route('/archived/:author')
  .get(note.archivednotes)

/* @route GET api/notes/id/:id
@description Get a single note by id
@access Public */
router.route('/id/:id')
  .get(note.notebyid)

/* @route POST api/notes
@description add/save new note
@access Public */
router.route('/')
  .post(note.savenote)

/* @route PUT api/notes/update/:id
@description Update existing note
@access Public */
router.route('/update/:id')
  .put(note.updatenote)

/* @route PUT api/notes/archive/:id
@description Archive single note
@access Public */
router.route('/archive/:id')
  .put(note.archiveenote)


/* @route PUT api/notes/multiarchive
@description Archive multiple notes
@access Public */
router.route('/multiarchive')
  .put(note.multiarchive)

/* @route PUT api/notes/unarchive/:id
@description Unrchive single archived note
@access Public */
router.route('/unarchive/:id')
  .put(note.unarchivenote)

/* @route PUT api/notes/multiunarchive
@description Unarchive multiple notes
@access Public */
router.route('/multiunarchive')
  .put(note.multiunarchive)

/* @route DELETE api/notes/:id
@description Delete note by id
@access Public */
router.route('/:id')
  .delete(note.deletenote)

/* @route GET api/notes/tags/:author/:tag
@description view active notes by tag
@access Public */
/* @route DELETE api/notes/tags/:author/:tag
@description delete active notes by tag
@access Public */
router.route('/tags/:author/:tag')
  .get(note.notebytag)
  .delete(note.deletenotebytag)


module.exports = router;