import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import pCreateCommentMock from './lib/comment-mock';
import { pCreateUserMock } from './lib/user-mock';
import { pCreateArticleMock } from './lib/article-mock';
import Article from '../model/article';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('Verify POST /comments', () => {
  beforeAll(startServer);
  afterAll(stopServer);

  test('POST /comment', () => {
    const user1 = {};
    let commentMock = null;

    const mockUser1 = pCreateUserMock()
      .then((user) => {
        user1.profile = user;
        return pCreateArticleMock(user);
      })
      .then((article) => {
        user1.article = article;
        return pCreateCommentMock(article)
          .then((comment) => {
            commentMock = comment;
            return Article.findById(user1.article.article._id)
              .then((updatedArticle) => {
                expect(updatedArticle.comments.length > 0).toBeTruthy();
              });
          })
          .then(() => {
            return superagent.post(`${apiURL}/comment`)
              .set('Content-Type', 'application/json')
              .set('Authorization', `Bearer ${user1.profile.token}`)
              .send({
                content: faker.lorem.words(25),
                article: commentMock.comment.article,
              }); 
          })
          .then(() => {
            return Article.findById(user1.article.article._id)
              .then((updatedArticle) => {
                expect(updatedArticle.comments.length > 1).toBeTruthy();
              });
          });
      });
    return Promise.all([mockUser1]);
  });
});
describe('Verify DELETE /comment/:comment_id', () => {
  beforeAll(startServer);
  afterAll(stopServer);

  test('DELETE /comment', () => {
    return pCreateUserMock()
      .then((user) => {
        return pCreateArticleMock(user)
      
          .then((article) => {
            return pCreateCommentMock(article);
          })
          .then((comment) => {
            return superagent.delete(`${apiURL}/comment/${comment.comment._id}`)
              .set('Content-Type', 'application/json')
              .set('Authorization', `Bearer ${user.token}`);
          })
          .then((response) => {
            expect(response.status).toEqual(204);
          });
      });
  });
});

