import express from 'express';
import ArticleController from '../controllers/articles';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/articles', auth, ArticleController.createSingleArticle);

module.exports = router;