'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pCreateAccountMock, pRemoveAccountMock } from './lib/account-mock';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('POST - AUTH', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveAccountMock);

  test('POST creating an account should respond with 200 and a token if there are no errors', () => {
    return superagent.post(`${apiURL}/signup`)
      .send({
        username: 'kona',
        email: 'kona@kona.com',
        password: 'password',
      })
      .then((response) => {
        const BlogToken = response.headers['set-cookie'][0];
        expect(BlogToken.split('=')[1].split(';')[0]).toEqual(response.body.token);
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      });
  });

  test('POST /signup - an incomplete request: no password, should return a 400', () => {
    return superagent.post(`${apiURL}/signup`)
      .send({
        username: 'kona',
        email: 'kona@kona.com',
      })
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });

  test('POST /signup - an incomplete request: no username, should return a 400', () => {
    return superagent.post(`${apiURL}/signup`)
      .send({
        password: 'password',
        email: 'kona@kona.com',
      })
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });

  test('POST /signup - an incomplete request: no email, should return a 400', () => {
    return superagent.post(`${apiURL}/signup`)
      .send({
        username: 'kona',
        password: 'password',
      })
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
});
describe('GET - AUTH', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveAccountMock);

  test('GET /login should get a 200 status code and a token if there are no errors', () => {
    return pCreateAccountMock()
      .then((mock) => {
        return superagent.get(`${apiURL}/login`)
          .auth(mock.request.username, mock.request.password);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy(); 
        const BlogToken = response.headers['set-cookie'][0];
        expect(BlogToken.split('=')[1].split(';')[0]).toEqual(response.body.token);
      });
  });
  test('GET /login should return status 401 if bad credetials', () => {
    return pCreateAccountMock()
      .then((mock) => {
        return superagent.get(`${apiURL}/login`)
          .auth(mock.request.username, 'password');
      })
      .catch((response) => {
        expect(response.status).toEqual(401);
      });
  });
  test('GET /login should return status 400, basic authorization required', () => {
    return pCreateAccountMock()
      .then((mock) => {
        return superagent.get(`${apiURL}/login`)
          .set('Authorization', {})
          .send(mock.request.username, mock.request.password);
      })
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  test('GET /login should return status 400, authorization header required', () => {
    return pCreateAccountMock()
      .then((mock) => {
        return superagent.get(`${apiURL}/login`)
          .send(mock.request.username, mock.request.password);
      })
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  test('GET /login should return status 400, username and password required', () => {
    return pCreateAccountMock()
      .then((mock) => {
        return superagent.get(`${apiURL}/login`)
          .auth(mock.request.username);
      })
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
});
