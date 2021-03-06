import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
    unique: true, 
  },
  username: { 
    type: String, 
    required: true, 
  },
  avatar: { 
    type: String, 
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'article',
    },
  ],
  gitHub: {
    type: String, 
  },
  linkedIn: {
    type: String, 
  },
  portfolio: {
    type: String, 
  },
});

export default mongoose.model('user', userSchema);
