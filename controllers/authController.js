import { registerUser, loginUser, ValidationError } from '../services/authService.js';

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


// GET /login
export function showLoginForm(req, res) {
  res.render('login', { title: 'Login', error: null, email: '' });
}

// POST /login (checks crendetials and creates session)
export async function handleLogin(req, res, next) {
  try {
    const user = await loginUser(req.body);

    req.session.user = { id: user.id, name: user.name, role: user.role };
    // sends managers to their dashboard and customers to reservation
    if (user.role === 'manager') {
      res.redirect('/manager');
    } else {
      res.redirect('/restaurants');
    }
  } catch (error) {

    if (error instanceof ValidationError) {
      res.status(error.status);
      res.render('login', {
        title: 'Login',
        error: error.message,
        email: req.body.email ?? ''
      });
    } else {
      next(error);
    }
  }
}

// POST /logout: end the session
export function handleLogout(req, res, next) {
  // destroys the session
  req.session.destroy(() => {
    res.redirect('/');
  });
}