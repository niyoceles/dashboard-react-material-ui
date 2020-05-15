import express from 'express';

import starRoutes from './starRoutes';
import userRoutes from './userRoutes';

const router = express.Router();

router.use('/star', starRoutes);
router.use('/user', userRoutes);

export default router;
