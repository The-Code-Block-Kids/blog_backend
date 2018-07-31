import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pCreateUserMock } from './lib/user-mock';
import { pCreateArticleMock } from './lib/article-mock';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('Verify GET routes for Tag Sorting', () => {
  beforeAll(startServer);
  afterAll(stopServer);

  test('GET - /filter/:tag', () => {
    return pCreateUserMock()
      .then((user) => {
        return Promise.all([
          pCreateArticleMock(user), 
          pCreateArticleMock(user), 
          pCreateArticleMock(user),
        ]);
      })
      .then((articles) => {
        return superagent.get(`${apiURL}/filter/JavaScript`)
          .then((response) => {
            expect(response.status).toEqual(200);
          });
      });
  });
});
