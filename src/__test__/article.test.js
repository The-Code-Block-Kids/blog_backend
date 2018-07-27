import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pCreateAccountMock } from './lib/account-mock';
import { pCreateUserMock } from './lib/user-mock';
import Account from '../model/account';
import { pCreateArticleMock } from './lib/article-mock';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('Verify GET ALL Articles', () => {
  beforeAll(startServer);
  afterAll(stopServer);

  test('GET - /articles', () => {
    return pCreateUserMock()
      .then((user) => {
        return Promise.all([pCreateArticleMock(user), pCreateArticleMock(user)]);
      })
      .then((user) => {
        return superagent.get(`${apiURL}/articles`)
          .then((response) => {
            expect(response.status).toEqual(200);
          });
      });
  });
});
