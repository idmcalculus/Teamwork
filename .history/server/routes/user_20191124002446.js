import 'express-async-errors';
import express from 'express';
import UserController from '../controllers/user';
import auth from '../middlewares/auth';
import isAdmin from '../middlewares/admin';

const router = express.Router();

router.post(
    '/auth/create-user',
    isAdmin,
    UserController.createUserAccount
);

router.post('/auth/login', UserController.loginUser);

module.exports = router;