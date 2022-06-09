

// Load Notes model
const Note = require('../../models/Note');
// Load User model
const User = require('../../models/User');

/* from GET api/admin
@description Get all notes
*/
exports.notes = function(req, res) {
    Note.find()
      .then(notes => res.json(notes))
      .catch(err => res.status(404).json({ nonotesfound: 'No Notes found' }));
  };

/* from GET api/admin/archived
@description Get all archived notes
*/
exports.archivednotes = function(req, res) {
    Note.find({archived: true })
      .then(notes => res.json(notes))
      .catch(err => res.status(404).json({ nonotesfound: 'No Archived Notes found' }));
  };

/* from GET api/admin/active
@description Get all active notes/ Get all notes that aren't archived
*/
exports.activenotes = function(req, res) {
    Note.find({archived: false })
      .then(notes => res.json(notes))
      .catch(err => res.status(404).json({ nonotesfound: 'No Active Notes found' }));
  };

/* from GET api/admin/users
@description Get all users
*/
exports.users = function(req, res) {
    User.find({})
      .then(users => res.json(users))
      .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
  };

/* from POST api/admin/users
@description add/save new user
*/ 
exports.adduser = function(req, res) {
  User.create(req.body)
  .then(user => res.json({ msg: 'User added successfully' }))
  .catch(err => res.status(400).json({ error: 'Unable to add this user ' + err }));
  };

/* from DELETE api/admin/users/:userid
@description Delete user by userid
*/ 
exports.deleteuser = function(req, res) {
    User.findOneAndDelete(req.params.userid, req.body)
      .then(user => res.json({ msg: 'User deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such user found ' +err}));
    };