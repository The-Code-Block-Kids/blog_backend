import faker from 'faker';
import Comment from '../../model/comment';

const pCreateCommentMock = (parent) => {
  const resultMock = {};
  return new Comment({
    content: faker.lorem.words(15),
    article: parent.article._id,
  }).save()
    .then((comment) => {
      resultMock.comment = comment;
      return resultMock;
    });
};

export default pCreateCommentMock;
