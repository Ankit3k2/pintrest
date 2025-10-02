import mongoose from'mongoose';
import Post from './posts.js';
import plm from "passport-local-mongoose"
mongoose.connect ("mongodb://127.0.0.1:27017/pintrest")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    
  },
  post: [{
    type: mongoose.Types.ObjectId,
    ref: "Post",
    default: []}]
  ,
  dp: {
    type: String, // URL or path to display picture
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  fullname: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true // adds createdAt and updatedAt fields
});

// Export the model
userSchema.plugin(plm)
const User = mongoose.model('User', userSchema);

export default User