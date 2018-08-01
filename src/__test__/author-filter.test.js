import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pCreateUserMock } from './lib/user-mock';
import { pCreateArticleMock } from './lib/article-mock';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('Verify GET routes for Author Sorting', () => {
  beforeAll(startServer);
  afterAll(stopServer);

  test('GET - /authors/:name', () => {
    let userA = null;
    let userB = null;
    return pCreateUserMock()
      .then((user) => {
        userA = user;
        return Promise.all([
          pCreateArticleMock(user), 
          pCreateArticleMock(user), 
          pCreateArticleMock(user),
        ]);
      })
      .then(() => {
        return pCreateUserMock()
          .then((user) => {
            userB = user;
            return Promise.all([
              pCreateArticleMock(user), 
              pCreateArticleMock(user), 
              pCreateArticleMock(user),
            ]);
          });
      })
      .then(() => {
        return superagent.get(`${apiURL}/authors/${userA.user._id}`);
      })
      .then((response) => {
        expect(response.body[0].createdBy).toEqual(userA.user._id.toString());
        expect(response.body.length).toEqual(3);
      })
      .then(() => {
        return superagent.get(`${apiURL}/authors/${userB.user._id}`);
      })
      .then((response) => {
        expect(response.body[0].createdBy).toEqual(userB.user._id.toString());
        expect(response.body.length).toEqual(3);
      });
  });
});
