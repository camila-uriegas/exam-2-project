import express from 'express';
import { showRestaurants } from '../controllers/restaurantController.js';
// maps URLs to controller functions

const router = express.Router();

// GET /restaurants
router.get('/', showRestaurants);

export default router;