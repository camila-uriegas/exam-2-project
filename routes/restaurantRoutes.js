import express from 'express';
import { showRestaurants } from '../controllers/restaurantController.js';
import { requireLogin } from '../middleware/requireLogin.js';
// maps URLs to controller functions

const router = express.Router();

// GET /restaurants
router.get('/', showRestaurants);

router.get('/', requireLogin, showRestaurants);

export default router;