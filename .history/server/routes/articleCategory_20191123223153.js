import express from 'express';
import ArticleController from '../controllers/articles';
import CategoryController from '../controllers/articleCategory';
import auth from '../middlewares/auth';
import admin from '../middlewares/admin';

const router = express.Router();

router.get('/v1/categories', auth, admin, CategoryController.getAllCategories);
router.get('/v1/categories/:id', auth, admin, CategoryController.getSingleCategory);
router.post('/v1/categories', auth, admin, CategoryController.createSingleCategory);
router.patch('/v1/categories/:id', auth, admin, CategoryController.updateSingleCategory);
router.delete('/v1/categories/:id', auth, admin, CategoryController.deleteSingleCategory);

router.get('/v1/categories/:categoryId/articles', auth, ArticleController.getArticlesInCategory);

module.exports = router;