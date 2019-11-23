require("express-async-errors");
import { Router } from 'express';
import UserController from '../controllers/user';
import auth from '../middlewares/auth';
import isAdmin from '../middlewares/admin';

const router = Router();

router.post(
    '/',
    auth,
    isAdmin,
    UserController.createUserAccount
);

module.exports = router;