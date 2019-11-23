import express from 'express';
import ArticleController from '../controllers/articles';
import ArticleCommentController from '../controllers/articleComments';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/articles', auth, ArticleController.createSingleArticle);
router.get('/articles', auth, ArticleController.getAllArticles);
router.get('/articles/:articleId', auth, ArticleController.getSingleArticle);
router.patch('/articles/:articleId', auth, ArticleController.updateSingleArticle);
router.delete('/articles/:articleId', auth, ArticleController.deleteSingleArticle);
router.post('/articles/:articleId/comment', auth, ArticleCommentController.writeComment);

module.exports = router;