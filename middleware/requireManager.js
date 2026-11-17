export function requireManager(req, res, next) {
  // not logged in at all: go to login
  if (!req.session.user) {
    return res.redirect('/login');
  }

  // logged in but not a manager: blocked
  if (req.session.user.role !== 'manager') {
    return res.status(403).send('Access denied. Managers only.');
  }

  next();
}