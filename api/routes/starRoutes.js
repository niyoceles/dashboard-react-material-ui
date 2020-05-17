import express from 'express';
import starController from '../controllers/starController';
import starValidation from '../validations/starValidation';
import {
  checkToken
} from '../helpers';

const router = express.Router();
router.post(
  '/',
  checkToken,
  starValidation.validateStarInput,
  starController.createStar
);
router.put(
  '/:order_id',
  checkToken,
  starValidation.validateStarInput,
  starController.updateStar
);
router.delete(
  '/:order_id',
  checkToken,
  starValidation.validateStarOrderId,
  starController.deleteStar
);
router.get(
  '/',
  // checkToken,
  starController.allStars
);

export default router;
