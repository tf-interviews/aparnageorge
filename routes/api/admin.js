const express = require('express');
const router = express.Router();

// Load Notes model
const Note = require('../../models/Note');
// Load User model
const User = require('../../models/User');
// Load Admin Controller
var admin = require('../../controllers/api/adminController');

/* @route GET api/admin
@description Get all notes
@access Public */
router.route('/')
  .get(admin.notes)

/* @route GET api/admin/archived
@description Get all archived notes
@access Public */ 
router.route('/archived')
  .get(admin.archivednotes)


/* @route GET api/admin/active
@description Get all notes that aren't archived
@access Public */
router.route('/active')
  .get(admin.activenotes)

/* @route GET api/admin/users
@description Get all users
@access Public */
/* @route POST api/admin/users
@description add/save new user
@access Public */
router.route('/users')
  .get(admin.users)
  .post(admin.adduser)


/* @route DELETE api/admin/users/:userid
@description Delete user by userid
@access Public */
router.route('/users/:userid')
  .delete(admin.deleteuser)
  
module.exports = router;