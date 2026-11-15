import express from 'express';
import { showRegisterForm, handleRegister } from '../controllers/authController.js'

const router = express.Router();

// sends to the register page when doing those functions
router.get('/register', showRegisterForm);
router.post('/register', handleRegister);

export default router;