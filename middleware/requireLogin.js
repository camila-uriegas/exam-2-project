
// before controller
// only lets logged in users
export function requireLogin(req, res, next) {
  // no user in session, none logged in
  if (!req.session.user) {
    return res.redirect('/login');
  }

  // logged in, so continue to the next function (the controller)
  next();
}