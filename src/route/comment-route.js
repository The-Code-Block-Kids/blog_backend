import { Router } from 'express';
import { json } from 'body-parser';
import CommentModel from '../model/comment';
import bearerAuth from '../lib/bearer-auth';
import logger from '../lib/logger';

const commentRouter = new Router();
const jsonParser = json();

commentRouter.post('/comment', bearerAuth, jsonParser, (request, response, next) => {
  return new CommentModel({
    content: request.body.content,
    article: request.body.article,
  }).save()
    .then((comment) => {
      logger.log(logger.info, 'Returning a 200 and new Comment');
      return response.json(comment);
    })
    .catch(next);
});

export default commentRouter;
