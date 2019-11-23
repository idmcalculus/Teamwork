import express from 'express';
import ArticleController from '../controllers/articles';
import CategoryController from '../controllers/articleCategory';
import auth from '../middlewares/auth';
import admin from '../middlewares/admin';

const router = express.Router();

router.get('/categories', auth, admin, CategoryController.getAllCategories);
router.get('/categories/:id', auth, admin, CategoryController.getSingleCategory);
router.post('/categories', auth, admin, CategoryController.createSingleCategory);
router.patch('/categories/:id', auth, admin, CategoryController.updateSingleCategory);
router.delete('/categories/:id', auth, admin, CategoryController.deleteSingleCategory);
router.get('/categories/:categoryId/articles', auth, ArticleController.getArticlesInCategory);

module.exports = router;