import express from 'express';
import { checkToken } from '../helpers';
import userController from '../controllers/userController';

const router = express.Router();
router.post('/signin', userController.signIn);
router.post('/signout', checkToken, userController.signout);

export default router;
