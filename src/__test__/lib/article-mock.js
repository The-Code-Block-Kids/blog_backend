'use strict';

import faker from 'faker';
import Article from '../../model/article';
import tagSetMock from '../lib/tag-set-mock';

const pCreateArticleMock = (user) => {
  const resultMock = {};
  return new Article({
    title: faker.lorem.words(3),
    content: faker.lorem.words(15),
    link: faker.internet.url,
    tags: tagSetMock[Math.floor(Math.random() * Math.floor(3))], 
    comments: [],
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
