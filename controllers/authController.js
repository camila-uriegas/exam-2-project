import { registerUser, ValidationError } from '../services/authService.js';

// GET /register
export function showRegisterForm(req, res) {
  res.render('register', { title: 'Register', error: null, name: '', email: '' });
}

// POST /register  (submitted form)
export async function handleRegister(req, res, next) {
  try {
    // creates user from function in authservice
    await registerUser(req.body);
    res.redirect('/login'); // so the user can login

  } catch (error) {
    if (error instanceof ValidationError) {
        res.status(error.status);
        res.render('register', {
            title: 'Register',
            error: error.message,
            name: req.body.name,
            email: req.body.email
        })
      
    } else {
      next(error);
    }
  }
}