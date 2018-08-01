import { Router } from 'express';
import ArticleModel from '../model/article';

const authorFilterRouter = new Router();

authorFilterRouter.get('/authors/:id', (request, response, next) => {
  return ArticleModel.find({ createdBy: { $all: [request.params.id] } })
    .then((articles) => {
      const articlesSort = (property) => {
        let sortOrder = 1;
        if (property[0] === '-') {
          sortOrder = -1;
          property = property.substr(1); // eslint-disable-line
        }
        return (a, b) => {
          const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0; // eslint-disable-line
          return result * sortOrder;
        };
      };
      return response.json(articles.sort(articlesSort('-postedOn')));
    })
    .catch(next);
});

export default authorFilterRouter;
