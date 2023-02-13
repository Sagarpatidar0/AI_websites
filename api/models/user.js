const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.']
  },
  email: {
    type: String,
    required: [true,"Email is required."],
    unique: [true, 'Email must be unique.'],
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [8, 'Password must have at least 8 characters.']
  }
},{timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;