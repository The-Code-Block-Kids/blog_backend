import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import { pCreateUserMock } from './lib/user-mock';
import { pCreateArticleMock } from './lib/article-mock';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('Verify GET routes for Articles', () => {
  beforeAll(startServer);
  afterAll(stopServer);

  test('GET - /articles', () => {
    return pCreateUserMock()
      .then((user) => {
        return Promise.all([pCreateArticleMock(user), pCreateArticleMock(user)]);
      })
      .then(() => {
        return superagent.get(`${apiURL}/articles`)
          .then((response) => {
            expect(response.status).toEqual(200);
          });
      });
  });
  test('GET - /articles/:article_id', () => {
    return pCreateUserMock()
      .then((user) => {
        let articleMock = null;
        return pCreateArticleMock(user)
          .then((article) => {
            articleMock = article.article;
            return superagent.get(`${apiURL}/articles/${article.article._id}`);
          })
          .then((response) => {
            expect(response.status).toEqual(200);
            expect(response.body._id).toEqual(articleMock._id.toString());
          });
      });
  });
});
describe('Verify PUT route for Articles', () => {
  beforeAll(startServer);
  afterAll(stopServer);

  test('PUT - /articles/:article_id', () => {
    return pCreateUserMock()
      .then((user) => {
        let articleMock = null;
        return pCreateArticleMock(user)
          .then((article) => {
            articleMock = article.article;
            return superagent.put(`${apiURL}/articles/${article.article._id}`)
              .set('Content-Type', 'application/json')
              .set('Authorization', `Bearer ${user.token}`)
              .send({
                content: faker.lorem.words(25),
              });
          })
          .then((response) => {
            expect(response.status).toEqual(200);
            expect(response.body._id).toEqual(articleMock._id.toString());
            expect(response.body.content).not.toEqual(articleMock.content);
          });
      });
  });
});
