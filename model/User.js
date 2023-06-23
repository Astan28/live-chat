'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: 'username is required',
  },
  password: {
    type: String,
    required: 'password is required',
    minlength: 6,
    maxlength: 255,
  },
  email: {
    type: String,
    required: 'email is required',
    unique: true,
    minlength: 10,
    maxlength: 255
  }
});

module.exports = mongoose.model('User', userSchema, 'users');
