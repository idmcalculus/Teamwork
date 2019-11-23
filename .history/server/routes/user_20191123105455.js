require("express-async-errors");
import { Router } from 'express';
import UserController from '../controllers/user.controller';
import auth from '../middlewares/auth';
import isAdmin from '../middlewares/admin';

const router = Router();

router.post(
    "/v1/auth/create-user",
    auth,
    isAdmin,
    UserController.createUserAccount
);

module.exports = router;