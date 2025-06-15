const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [3, 'uesername must be at least 3 characters long']
  },
  email: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [13, 'email must be at least 13 characters long']
  },
  password: {
    type: String,
    require: true,
    trim: true,
    minlength: [5, 'password must be at least 5 characters long']
  },
  college_code: {
    type: String,
    require: false,
    trim: true,
    lowercase: true
  }
})

const users = mongoose.model('users', userSchema);

module.exports = users; 