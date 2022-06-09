const mongoose = require('mongoose');

//Schema for the user collection
const UserSchema = new mongoose.Schema({
  
  // Full name of the user
  name: {
    type: String,
    required: true
  },
  // unique user id of the user
  userid:{
    type: String,
    required: true  ,
    unique: true
  },
  // Bio/Description of the user
  bio: {
    type: String
  },
  // Date of user joining the application 
  join_date: {
    type: Date,
    default: Date.now
  },
  //Whether user has admin privileges or not
  admin: {
    type: Boolean,
    default: false
  }
  
});

module.exports = User = mongoose.model('user', UserSchema);