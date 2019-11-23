require("express-async-errors");
import express from 'express';
import UserController from '../controllers/user';
import auth from '../middlewares/auth';
import isAdmin from '../middlewares/admin';

const router = express.Router();

router.post(
    '/auth/create-user',
    auth,
    isAdmin,
    UserController.createUserAccount
);

module.exports = router;