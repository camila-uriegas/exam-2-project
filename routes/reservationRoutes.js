import express from 'express';
import { showReserveForm, handleReserve } from '../controllers/reservationController.js';
import { requireLogin } from '../middleware/requireLogin.js';

const router = express.Router();

router.get('/:restaurantId', requireLogin, showReserveForm);
router.post('/:restaurantId', requireLogin, handleReserve);

export default router;