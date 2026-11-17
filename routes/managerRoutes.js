import express from 'express';
import { showDashboard, handleDelete } from '../controllers/managerController.js';
import { requireManager } from '../middleware/requireManager.js';

const router = express.Router();

// every route in this file is manager-only
router.use(requireManager);

router.get('/', showDashboard);
router.post('/reservations/:id/delete', handleDelete);

export default router;