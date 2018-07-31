'use strict';

import faker from 'faker';
import Article from '../../model/article';
import tagSetMock from '../lib/tag-set-mock';

const pCreateArticleMock = (user) => {
  const resultMock = {};
  const tagSet = new Set();
  tagSetMock[0].forEach(tag => tagSet.add(tag));
  return new Article({
    title: faker.lorem.words(3),
    content: faker.lorem.words(15),
    link: faker.internet.url,
    tags: tagSet, 
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
