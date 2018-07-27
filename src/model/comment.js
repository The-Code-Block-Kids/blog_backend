import mongoose from 'mongoose';
import Article from '../model/article';

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  postedOn: {
    type: Date,
    default: () => new Date(),
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'article',
    required: true,
  },
  comments: {
    type: Array,
    default: [],
  },
});

function commentPrehook(done) {
  return Article.findById(this.article)
    .then((article) => {
      article.comments.push(this);
      return article.save();
    })
    .then(() => done())
    .catch(done);
}

commentSchema.pre('save', commentPrehook);
export default mongoose.model('comment', commentSchema);
