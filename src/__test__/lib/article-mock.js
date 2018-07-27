'use strict';

import faker from 'faker';
import Article from '../../model/article';

const pCreateArticleMock = (user) => {
  const resultMock = {};
  return new Article({
    title: faker.lorem.words(3),
    content: faker.lorem.words(15),
    link: faker.internet.url,
    comments: [],
    tags: [],
    createdBy: user.user._id,
  }).save()
    .then((article) => {
      resultMock.article = article;
      return resultMock;
    });
};

const pRemoveArticleMock = () => Promise.all([
  Article.remove({}),
]);

export { pCreateArticleMock, pRemoveArticleMock };
