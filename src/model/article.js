import mongoose from 'mongoose';

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
  link: {
    type: String,
  },
  comments: [{
    type: String,
  }],
  tags: [{
    type: String,
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
});

const ArticleModel = module.exports = mongoose.model('article', articleSchema);
export default ArticleModel;
