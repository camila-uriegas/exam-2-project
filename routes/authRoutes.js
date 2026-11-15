import express from 'express';
import { 
    showRegisterForm, 
    handleRegister, 
    showLoginForm,
    handleLogin,
    handleLogout
} from '../controllers/authController.js'

const router = express.Router();

// sends to the register page when doing those functions
router.get('/register', showRegisterForm);
router.post('/register', handleRegister);

//sends to the login page
router.get('/login', showLoginForm);
router.post('/login', handleLogin);
router.post('/logout', handleLogout);

export default router;