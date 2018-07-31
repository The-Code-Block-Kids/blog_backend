import mongoose from 'mongoose';
import User from '../model/user';

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  postedOn: {
    type: Date,
    default: () => new Date(),
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  comments: {
    type: Array,
    default: [],
  },
  tags: {
    type: Array,
    default: [],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
});

function articlePrehook(done) {
  return User.findById(this.createdBy)
    .then((user) => {
      user.posts.push(this);
      return user.save();
    })
    .then(() => done())
    .catch(done);
}

articleSchema.pre('save', articlePrehook);
export default mongoose.model('article', articleSchema);
