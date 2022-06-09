// Load Notes model
const Note = require('../../models/Note');

/* from GET api/notes/:author
@description Get all notes by userid that aren't archived
*/
exports.activenotes = function(req, res) {
    Note.find({ author: req.params.author, archived: false })
    .sort([['published_date̦', -1]])
    .then(notes => res.json(notes))
    .catch(err => res.status(404).json({ nonotesfound: 'No Active Notes found' }));
  };

/* from GET api/notes/archived/:author
@description Get all archived notes by userid
*/
exports.archivednotes = function(req, res) {
    Note.find({ author: req.params.author, archived: true })
    .then(notes => res.json(notes))
    .catch(err => res.status(404).json({ nonotesfound: 'No Archived Notes found' }));
  };

/* from GET api/notes/id/:id
@description Get a single note by id
*/
exports.notebyid = function(req, res) {
    Note.findById(req.params.id)
    .then(note => res.json(note) )
    .catch(err => res.status(404).json({ nonotesfound: 'No Notes found' }));
  };

/* from POST api/notes
@description add/save new note
*/
exports.savenote = function(req, res) {
    var noteTemp = new Note(req.body)
    noteTemp.save()
    .then(note => res.json(note))
    .catch(err => res.status(400).json({ error: 'Unable to add this note' }));
  };

/* from PUT api/notes/update/:id
@description Update existing note
*/
exports.updatenote = function(req, res) {
    Note.findByIdAndUpdate(req.params.id, req.body)
    .then(note => res.json({ msg: 'Note Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Note' })
    );
  };
  
/* from PUT api/notes/archive/:id
@description Archive single note
*/
exports.archiveenote = function(req, res) {
    Note.findByIdAndUpdate(req.params.id, 
        {$set: {'archived': true}}, 
        {new: true})
        .then(note => res.json({ msg: 'Note Archived successfully' }))
        .catch(err =>
          res.status(400).json({ error: 'Unable to archive the Note' })
        );
  };

/* from PUT api/notes/multiarchive
@description Archive multiple notes
*/
exports.multiarchive = function(req, res) {
    Note.updateMany({'_id': { $in: req.body.ids }}, 
    {$set: {'archived': true}}, 
    {new: true})
    .then(note => res.json({ msg: 'Notes Archived successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to archive the Notes' })
    );
  };

/* from PUT api/notes/unarchive/:id
@description Unrchive single archived note
*/
exports.unarchivenote = function(req, res) {
    Note.findByIdAndUpdate(req.params.id, 
        {$set: {'archived': false}}, 
        {new: true})
        .then(note => res.json({ msg: 'Note Unarchived successfully' }))
        .catch(err =>
          res.status(400).json({ error: 'Unable to unarchive the Note' })
        );
  };
  
/* from PUT api/notes/multiunarchive
@description Unarchive multiple notes
*/ 
exports.multiunarchive = function(req, res) {
    Note.updateMany({'_id': { $in: req.body.ids }}, 
    {$set: {'archived': false}}, 
    {new: true})
    .then(note => res.json({ msg: 'Notes Unarchived successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to unarchive the Notes' })
    );
  };
  
/* from DELETE api/notes/:id
@description Delete note by id
*/
exports.deletenote = function(req, res) {
    Note.findByIdAndRemove(req.params.id, req.body)
    .then(note => res.json({ msg: 'Note deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such note found' }));
  };
  
/* from GET api/notes/tags/:author/:tag
@description view active notes by tag
*/ 
exports.notebytag = function(req, res) {
    Note.find({ tags: req.params.tag, author: req.params.author, archived: false })
  .then(note => res.json(note) )
  .catch(err => res.status(404).json({ nonotesfound: 'No Notes found' +err}));
  };
  
/* from DELETE api/notes/tags/:author/:tag
@description delete active notes by tag
*/  
exports.deletenotebytag = function(req, res) {
    Note.deleteMany({ tags: req.params.tag, author: req.params.author, archived: false })
  .then(note => res.json({ msg: 'Notes deleted successfully' }))
  .catch(err => res.status(404).json({ nonotesfound: 'No Notes found' +err}));
  };
  