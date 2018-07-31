import { Router } from 'express';
import { json } from 'body-parser';
import ArticleModel from '../model/article';
import logger from '../lib/logger';

const tagFilterRouter = new Router();
const jsonParser = json();

tagFilterRouter.get('/filter/:id', (request, response, next) => {
  const solution = [];
  return ArticleModel.find()
    .then((articles) => {
      articles.forEach((article) => {
        if (article.tags) {
          if (article.tags.has(request.params.id)) solution.push(article);
        }
      });
      return response.json(solution);
    })
    .catch(next);
});

export default tagFilterRouter;
