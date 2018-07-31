import { Router } from 'express';
import { json } from 'body-parser';
import ArticleModel from '../model/article';
import bearerAuth from '../lib/bearer-auth';
import logger from '../lib/logger';

const articleRouter = new Router();
const jsonParser = json();

articleRouter.get('/articles', (request, response, next) => {
  return ArticleModel.find()
    .then((articles) => {
      return response.json(articles);
    })
    .catch(next);
});
articleRouter.get('/articles/:article_id', (request, response, next) => {
  return ArticleModel.findById(request.params.article_id)
    .then((article) => {
      return response.json(article);
    })
    .catch(next);
});
articleRouter.put('/articles/:article_id', bearerAuth, jsonParser, (request, response, next) => {
  const options = { new: true, runValidators: true };
  return ArticleModel.findByIdAndUpdate(
    request.params.article_id,
    { $set: request.body },
    options,
  )
    .then((updatedArticle) => {
      return response.json(updatedArticle);
    })
    .catch(next);
});
articleRouter.post('/articles', bearerAuth, jsonParser, (request, response, next) => {
  const tagSet = new Set();
  request.body.tags.forEach(tag => tagSet.add(tag));
  return new ArticleModel({
    title: request.body.title,
    content: request.body.content,
    postedOn: request.body.postedOn,
    link: request.body.link,
    comments: request.body.comments,
    tags: tagSet,
    createdBy: request.body.createdBy,
  }).save()
    .then((article) => {
      console.log('Article DB save() return value: \n', article);
      logger.log(logger.INFO, 'Returning a 200 and a new Article');
      return response.json(article);
    })
    .catch(next);
});
articleRouter.delete('/articles/:article_id', bearerAuth, (request, response, next) => {
  return ArticleModel.findByIdAndRemove(request.params.article_id)
    .then(() => response.sendStatus(204))
    .catch(next);
});
export default articleRouter;
