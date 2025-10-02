import mongoose from'mongoose';

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // reference to the user who created the post
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String, // URL or path to image if the post has one
    default: ''
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment' // optional if you create a separate Comment model
  }]
}, {
  timestamps: true
});

const Post  = mongoose.model('Post', postSchema);
export default Post