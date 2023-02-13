const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const postSchema = new Schema({
  prompt: {
    type: String,
    required: [true, 'prompt is required.']
  },
  email: {
    type: String,
    required: [true,"Email is required."],
    lowercase: true
  },
  image:{
    type: String,
    required: [true, 'image_URL is required.']
  }
  
},{timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;