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
    
  ],
  gitHub: {
    type: String, 
  },
  linkedIn: {
    type: String, 
  },
  email: { 
    type: String, 
    required: true, 
  },
  portfolio: {
    type: String, 
  },
});

export default mongoose.model('user', userSchema);
